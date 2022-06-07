const puppeteer = require('puppeteer');
const URL = "https://poshmark.com/signup"

let browser;

const formAutomation = async (firstName, lastName, userName, email, password, gender, country) => {
  try{
    if(!browser)
      browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
    const page = await browser.newPage();
    await page.goto(URL, {waitUntil: 'networkidle2'});

    await page.type('input[name=firstName]', firstName);
    await page.type('input[name=lastName]', lastName);
    await page.type('input[name=userName]', userName);
    await page.type('input[name=password]', password);
    await page.type('input[name=email]', email);

    await page.click('div[data-test="dropdown-container"]');

    const [genderSelect] = await page.$x(`//li[@class='dropdown__menu__item' and contains(., ${gender})]`);
    if (genderSelect) {
        await genderSelect.click();
    }

    await page.click('button[data-et-name="create_account"]');
  } catch (error) {
    console.log(error);
  }
  
//  await browser.close();
};

const dataScraping = async (url) => {
  const newBrowser = await puppeteer.launch({ headless: true });
  const page = await newBrowser.newPage();
  await page.goto(url, {waitUntil: 'domcontentloaded'});

  const scrapedData = await page.evaluate(async () => {
    let [firstName] = document.querySelectorAll(".closet__header__info__user-details .d--fl .ellipses");
    let [lastName] = document.querySelectorAll(".closet__header__info__user-details .d--fl .m--l--2");
    let [listing] = document.querySelectorAll('span[data-test="closet_listings_count"]');
    let imgSrc = document.querySelector(".user-image").src;
    return {
      firstName: firstName.innerHTML,
      lastName: lastName.innerHTML,
      listingCount: listing.innerHTML,
      imgSrc
    }
  })
  await newBrowser.close();
  console.log(scrapedData);
  return scrapedData;
}

module.exports = {
  formAutomation,
  dataScraping
}