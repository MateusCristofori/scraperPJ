import puppeteer from "puppeteer";
// import { codeProcessData } from "./data/codeProcessData";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
  });

  await page.goto(
    "https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam"
  );

  const input = await page.$(
    "input[id='fPP:numProcesso-inputNumeroProcessoDecoration:numProcesso-inputNumeroProcesso']"
  );
  await input?.type("1003987-11.2022.4.01.3001");

  const button = await page.$("input[id='fPP:searchProcessos']");
  await button?.click();

  setTimeout(async () => {
    const divList = await page.$("tbody[id='fPP:processosTable:tb']");

    const results: any[] = [];
    for (const values in divList) {
      const value = await page.evaluate(
        (el) => el?.querySelector(":nth-child(3)")?.textContent,
        divList
      );
      results.push(value as never);
      console.log(value);
      console.log(results);
    }

    if (divList) {
      console.log("Achou o status no td");
      // console.log(value);
    }
  }, 1000);

  setTimeout(async () => {
    await browser.close();
  }, 100000000);
})();
