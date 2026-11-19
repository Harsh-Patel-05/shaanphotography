/**
 * Shaan Photography — branded HTML mailer (logo + studio/user emails)
 *
 * ONE-TIME SETUP:
 * 1. Open https://script.google.com  (login with Shaandigitalstudio@gmail.com)
 * 2. New project → delete default code → paste THIS whole file
 * 3. Save (Ctrl+S)
 * 4. Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Authorize / Allow
 * 6. Copy the Web app URL
 * 7. In project root create file `.env`:
 *      VITE_STUDIO_MAIL_ENDPOINT=PASTE_URL_HERE
 * 8. Stop and restart: npm run dev
 */

function doPost(e) {
  try {
    var data = JSON.parse((e.postData && e.postData.contents) || '{}')
    var studioTo = data.studioTo || Session.getActiveUser().getEmail()
    var userTo = data.userTo || ''
    var subjectStudio = data.subjectStudio || 'NEW website inquiry'
    var subjectUser = data.subjectUser || 'We received your message'
    var replyTo = data.replyTo || userTo
    var htmlStudio = data.htmlStudio || '<p>New inquiry</p>'
    var htmlUser = data.htmlUser || '<p>Thank you</p>'
    var textStudio = data.textStudio || 'New inquiry'
    var textUser = data.textUser || 'Thank you'

    MailApp.sendEmail({
      to: studioTo,
      subject: subjectStudio,
      htmlBody: htmlStudio,
      body: textStudio,
      replyTo: replyTo,
      name: 'Shaan Photography Website',
    })

    if (userTo) {
      MailApp.sendEmail({
        to: userTo,
        subject: subjectUser,
        htmlBody: htmlUser,
        body: textUser,
        replyTo: studioTo,
        name: 'Shaan Photography',
      })
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, message: 'Emails sent' }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Shaan Photography mailer' }))
    .setMimeType(ContentService.MimeType.JSON)
}
