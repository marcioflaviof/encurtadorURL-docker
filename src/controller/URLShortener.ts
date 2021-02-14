import { Request, Response } from "express";
import { Url } from "../entity/URL";

//Faz o serviço de diminuir a url e guardar no banco
export const URLShortener = async (req: Request, res: Response) => {
  const url = req.body.url;

  if (!isValidUrl(url)) {
    return res.status(404).send("URl não válida");
  }

  const checker = await urlChecker(url);

  var dateToday = new Date();

  // Checa a data e caso tenha expirado deleta do banco
  if (checker) {
    if (dateToday < checker.expiresDate) {
      return res.send(`Resgatado no banco como: ${checker.newUrl}`);
    } else if (dateToday > checker.expiresDate) {
      await Url.delete(checker);
    }
  }

  const randomNumber = Math.floor(Math.random() * (11 - 5) + 5); // Entre 5 and 10
  const shorterURL = generateRandomString(randomNumber);

  var expiresDate = new Date();
  expiresDate.setFullYear(expiresDate.getFullYear() + 1);
  try {
    await Url.insert({
      url,
      newUrl: `${process.env.HOST}${shorterURL}`,
      expiresDate,
    });
  } catch (err) {
    return res
      .status(404)
      .send(`Não foi possivel inserir no banco de dados: ${err} `);
  }

  return res.send(`Inserido no banco como: ${process.env.HOST}${shorterURL}`);
};

//Pega a URL e redireciona para a página guardada no banco de dados
export const GetURL = async (req: Request, res: Response) => {
  try {
    const url = await Url.findOne({
      newUrl: `${process.env.HOST}${req.params.url}`,
    });
    res.writeHead(301, { Location: url?.url });
    res.end();
    return;
  } catch (err) {
    return res
      .status(404)
      .send(`Não foi possível achar a pagina: ${err.message}`);
  }
};

//Gera uma string com números e letras
const generateRandomString = (length: number) => {
  return Math.random().toString(20).substr(2, length);
};

// Checa se já existe uma Url igual guardada no banco
const urlChecker = async (fullUrl: String) => {
  try {
    const check = await Url.findOne({ url: `${fullUrl}` });
    if (check) return check;
  } catch (err) {
    return false;
  }
  return false;
};

// Não é codigo proprietario, peguei na internet e adaptei (https://www.codegrepper.com/code-examples/javascript/typescript+check+if+is+valid+url)
const isValidUrl = (urlString: String) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  return !!pattern.test(`${urlString}`);
};
