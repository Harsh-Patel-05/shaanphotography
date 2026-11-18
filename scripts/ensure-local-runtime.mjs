/**
 * Permanent OneDrive / Windows fix for Vite crashes:
 *   Error: UNKNOWN: unknown error, read (errno: -4094)
 *
 * OneDrive reparse points break Node ReadStreams and fs.watch.
 * When the project is under OneDrive, node_modules + Vite cache
 * are kept on a real local disk path via directory junctions.
 * Local (non-OneDrive) checkouts are left untouched.
 */
import { existsSync, lstatSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { homedir } from 'node:os'

const projectRoot = process.cwd()
const onOneDrive = /onedrive/i.test(projectRoot)
const localRoot = join(
  process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'),
  'shaan-photography-runtime',
)
const localNodeModules = join(localRoot, 'node_modules')
const localViteCache = join(localRoot, 'vite-cache')
const projectNodeModules = join(projectRoot, 'node_modules')

function isJunctionOrSymlink(path) {
  try {
    return lstatSync(path).isSymbolicLink()
  } catch {
    return false
  }
}

function ensureDir(path) {
  mkdirSync(path, { recursive: true })
}

function run(command, args = []) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    windowsHide: true,
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

ensureDir(localRoot)
ensureDir(localViteCache)
process.env.VITE_CACHE_DIR = localViteCache

if (!onOneDrive) {
  console.log('[runtime] Local disk project — OneDrive workaround skipped')
  process.exit(0)
}

const nodeModulesExists = existsSync(projectNodeModules)
const nodeModulesIsLink = nodeModulesExists && isJunctionOrSymlink(projectNodeModules)

if (!nodeModulesExists) {
  ensureDir(localNodeModules)
  run('cmd.exe', [
    '/d',
    '/s',
    '/c',
    `mklink /J "${projectNodeModules}" "${localNodeModules}"`,
  ])
  console.log('[runtime] Linked node_modules ->', localNodeModules)
} else if (!nodeModulesIsLink) {
  console.log('[runtime] Moving node_modules off OneDrive...')
  if (existsSync(localNodeModules)) {
    rmSync(localNodeModules, { recursive: true, force: true })
  }
  run('cmd.exe', [
    '/d',
    '/s',
    '/c',
    `move /Y "${projectNodeModules}" "${localNodeModules}"`,
  ])
  run('cmd.exe', [
    '/d',
    '/s',
    '/c',
    `mklink /J "${projectNodeModules}" "${localNodeModules}"`,
  ])
  console.log('[runtime] node_modules now local at', localNodeModules)
} else {
  console.log('[runtime] node_modules already local-linked')
}
