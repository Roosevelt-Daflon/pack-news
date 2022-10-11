import axios from "axios";
import XPath from "xpath-html";

export const cnnServe =  async (req) =>{
    const news = []
    await axios.get(`https://www.cnnbrasil.com.br/?s=${req.params.s}&orderby=date`).then(r => {
        const page = XPath.fromPageSource(r.data)
        const nodes = page.findElements("//li[starts-with(@class, 'home__list__item')]");

        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            const title = XPath.fromNode(element).findElement("//h2[starts-with(@class, 'news-item-header__title market__new__title')]").getText()
            const url = XPath.fromNode(element).findElement("//a[starts-with(@class, 'home__list__tag')]").getAttribute("href").replace('//', "").replace('https:', "")
            news.push({title: title, url: url})
        }
    })

    return news;
}