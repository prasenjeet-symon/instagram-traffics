/**
 *  Create the email in the the MS Outlook.com
 */


const PuppeteerEmail = require('puppeteer-email')

module.exports.create_new_email = async () => {

    const user_to_create = {
        username: 'jensengering',
        password: 'jensengering1234',
        firstName: 'Jensen',
        lastName: 'Gering',
        birthday: {
            year: '2003',
            month: '02',
            day: '14'
        }
    }

    const client = new PuppeteerEmail('outlook')

    const email_created = await client.signup({
        username: user_to_create.username,
        password: user_to_create.password,
        firstName: user_to_create.firstName,
        lastName: user_to_create.lastName,
        birthday: {
            month: user_to_create.birthday.year,
            day: user_to_create.birthday.day,
            year: user_to_create.birthday.year
        },
    })

    console.log(email_created, 'email_created')
}