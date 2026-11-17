import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { URL } from 'url'

const outDir = '_media_extract/instagram/batch2'
fs.mkdirSync(outDir, { recursive: true })

const items = [
  {
    name: 'ig-2026-07-05.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/733831274_18634525783032560_7740291871276469740_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=SDr8vImIJToQ7kNvwFYfSSx&_nc_oc=AdrxVOr3bCOhVIWf6szjdvbsjYEpXe9VtvIoG12DIbwFg8GpLin5t-QaYddGZH1Nc0M&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=PmMBthZsS-3fZlGOzjLHDw&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQTDWL37wolZn9GFtP-UIJ3ey3_wypz7PkQ47dvWQelKqQ&oe=6B020135',
  },
  {
    name: 'ig-2026-07-01.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/727490643_18633112774032560_6922104968102143422_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=S9sRTsmoKlcQ7kNvwHe3is8&_nc_oc=AdqD061qO8DHs449ggOPsEGwyg1WWiRoGeOnPNnAJul2BdGxKhnjS2_jC-1h1HLQm5Y&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=PmMBthZsS-3fZlGOzjLHDw&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQStbJAQRytYZDLlv9p-1VuRxEJIEXL08ZkvMa-GU6RIKw&oe=6B021F3D',
  },
  {
    name: 'ig-2026-06-30.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/729705717_18632759695032560_3467495441334795977_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=_LF24qr9DbwQ7kNvwFOf0Ds&_nc_oc=Adp445bESRe5RHZDvnK95VGMct6tb970KkuVyeR6SHqR_sdtLdU_i1oYCaN5xnq3GPw&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=PmMBthZsS-3fZlGOzjLHDw&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQSUUxTHGjhHLAlVxIZBcY-bLk5wvExHSCd-0vLTj90QBQ&oe=6B02057E',
  },
  {
    name: 'ig-2026-04-20.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/670629104_18610436524032560_6630343743620260295_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=102&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=EAmZk3oOfc0Q7kNvwH9uXER&_nc_oc=Adps5MxN1jewMvZlm9ucLZIIuODcSODz0o8jeVpQnUhnzsIZQcI1ftkeUCryuhO-sjM&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=PmMBthZsS-3fZlGOzjLHDw&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQQ_L33vqHQjhGMoPHLbjGpgzKTYoO3XX7NAcFHUVq3i_w&oe=6B02084E',
  },
  {
    name: 'ig-2026-04-15.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/658875936_18609191026032560_2481700006772782829_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=N-2uK0w7-S8Q7kNvwEazsO0&_nc_oc=AdocB92H8JbcdmKBHMhqdRFlBeMwJpy_afKxJ_AVzDCP1MDGDq3qCnGpvZa6GJ5aiXc&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1pOq0BvKAJvW0_5n2RIenQ&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQTCa8AAYS4RLdDzfDnRbGuMLr9UnMDzdqRoi8zRtllZSw&oe=6B021144',
  },
  {
    name: 'ig-2026-03-31.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/660099922_18604765780032560_1315027919323325182_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=109&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=4OxSYsSj654Q7kNvwHyDYCw&_nc_oc=Ado2uznteClJQcV_sNyNanZ4AU1MCt1EtZmLklBaBOxms2V3dq_ifUAV7xuqiyUZxhg&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1pOq0BvKAJvW0_5n2RIenQ&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQQc5oky44Qtvr7zMQI2DsxS-vESL2Eye2qSBYNSpnmiBg&oe=6B01F30F',
  },
  {
    name: 'ig-2026-03-17.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/654328386_18600536905032560_1364109242817728138_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=VsDzkY1rM-UQ7kNvwGQ4-HH&_nc_oc=Adr2ZcNWb6WJkwj47cVraJSZtEJtn2jIWBQ6yYfpwcfsm6ZT2v25ChAzyVY9y5g2LOE&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1pOq0BvKAJvW0_5n2RIenQ&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQSyHwlBP4hVElIMFCOVsrAAU2hfdQUaaS6WynIXg7Jy7Q&oe=6B01F74C',
  },
  {
    name: 'ig-2026-03-05.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/642945186_18597298528032560_508936543679887070_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=cpw0QGSjDC4Q7kNvwEicRtu&_nc_oc=AdpqFCKYD1ey2rfR00II89G1YCHa7dZMJmw-LoV2SEnspszWdDB_WPj2_DJssA6wRiE&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1pOq0BvKAJvW0_5n2RIenQ&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQQJ0ZzrChrwIrkMjHmxA852oSiTG03k7ihpwvRs-pSjDg&oe=6B01E8CA',
  },
  {
    name: 'ig-2026-03-02.jpg',
    url: 'https://scontent.cdninstagram.com/v/t51.82787-15/639826524_18596621746032560_2839753344729848270_n.jpg?stp=dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0FST1VTRUxfSVRFTS5iZXN0X2ltYWdlX3VybGdlbi5DMyJ9&_nc_ohc=wIu9dORAn0AQ7kNvwECEqIc&_nc_oc=Adrfm94c6jdF4khXBYnOotG1Efu6aVsXDW3AR7UG0i-9MRRk4P9gqPPtudWYWMB__OA&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=1pOq0BvKAJvW0_5n2RIenQ&_nc_ss=7a689&_nc_ct=RQosPBUKFQIAAAA&oh=00_AQSRTxT1xopSHgaH1wgrTxq-GAsX4u5IvQX7VSWEhu28bw&oe=6B01FE1B',
  },
]

function fetchBuf(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const lib = u.protocol === 'https:' ? https : http
    const req = lib.get(
      url,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Referer: 'https://www.instagram.com/',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchBuf(res.headers.location).then(resolve, reject)
        }
        if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode))
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks)))
      },
    )
    req.on('error', reject)
  })
}

for (const item of items) {
  try {
    const buf = await fetchBuf(item.url)
    fs.writeFileSync(path.join(outDir, item.name), buf)
    console.log('ok', item.name, buf.length)
  } catch (e) {
    console.log('fail', item.name, e.message)
  }
}
