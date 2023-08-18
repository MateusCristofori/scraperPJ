import puppeteer from "puppeteer";
import { codeProcessData } from "./data/codeProcessData";
import { createPDF } from "./pdf/pdfMaker";
import fs from "fs";
import PDFDocument from "pdfkit";
import { checkProcessCode } from "./helpers/checkProcessCode";
import { index } from "cheerio/lib/api/traversing";

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("output.pdf"));

const results: string[] = [];

(async () => {
  for (let index = 0; index < codeProcessData.length; index++) {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
    });

    await checkProcessCode(codeProcessData[index], page);

    const input = await page.$(
      "input[id='fPP:numProcesso-inputNumeroProcessoDecoration:numProcesso-inputNumeroProcesso']"
    );

    await input?.type(`${codeProcessData[index]}`);
    await page.waitForTimeout(2000);

    const button = await page.$("input[id='fPP:searchProcessos']");
    await button?.click();
    await page.waitForTimeout(2000);

    const divList = await page.$("tbody[id='fPP:processosTable:tb']");
    const status = await page.evaluate(
      (el) => el?.querySelector(":nth-child(3)")?.textContent,
      divList
    );
    await page.waitForTimeout(1000);

    results.push(codeProcessData[index], status as string);
    createPDF(results, doc);

    setTimeout(async () => {
      await browser.close();
    }, 100000000);
  }
  console.log(results);
})();
