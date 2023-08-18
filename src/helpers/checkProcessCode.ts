import { Page } from "puppeteer";

export const checkProcessCode = async (processCodeList: string, page: Page) => {
  const checkLastNumber = processCodeList.at(-1);

  console.log(checkLastNumber);

  if (checkLastNumber === "1") {
    return await page.goto(
      "https://pje1g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam"
    );
  }

  return await page.goto(
    "https://pje2g.trf1.jus.br/consultapublica/ConsultaPublica/listView.seam"
  );
};
