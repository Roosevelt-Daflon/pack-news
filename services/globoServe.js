import axios from "axios";
import XPath from "xpath-html";

export const globoServe =  async (req) =>{
    const news = []
    await axios.get('https://g1.globo.com/busca/?q='+req.params.s).then(r => {
        const page = XPath.fromPageSource(r.data)
        const nodes = page.findElements("//li[starts-with(@class, 'widget widget--card widget--info')]");
        
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            const title = XPath.fromNode(element).findElement("//div[starts-with(@class, 'widget--info__title')]").getText()
            const description =  XPath.fromNode(element).findElement("//p[starts-with(@class, 'widget--info__description')]").toString()
            const url = XPath.fromNode(element).findElement("//a[starts-with(@href, '//g1.globo')]").getAttribute("href")
            news.push({title: title, description:description, url: url})
        }
    })

    return news;
}