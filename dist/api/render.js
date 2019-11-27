import { cdn } from "../../config/config";

/**
 * 添加阿里cdn到head标签
 */
const cdnLink = `<link rel="stylesheet" href=${cdn}>`;
export const addCDN = () => {
  $(cdnLink).appendTo($("head"));
};

/**
 * head标签加载SEO
 */
export const seoRender = () => {
  api.getSeo().then(res => {
    const data = res.data[0];
    setSeo(data.seo_title, data.keywords, data.description);
  });

  const setSeo = function(title, keywords, description) {
    let h = document.head,
      c = h.querySelector("meta[charset]"),
      t = h.getElementsByTagName("title")[0],
      k = h.querySelector('meta[name="keywords"]'),
      d = h.querySelector('meta[name="description"]'),
      a = h.querySelector('meta[name="author"]');
    if (!c) {
      c = document.createElement("meta");
      c.setAttribute("charset", "utf-8");
      h.insertBefore(c, h.firstChild);
    }
    (t = t ? t : document.createElement("title")), (t.innerHTML = title);
    (k = k ? k : document.createElement("meta")),
      (k.name = "keywords"),
      (k.content = keywords);
    (d = d ? d : document.createElement("meta")),
      (d.name = "description"),
      (d.content = description);
    (a = a ? a : document.createElement("meta")),
      (a.name = "author"),
      (a.content = "技术支持：雨飞设计www.yfd.com.cn");
    h.insertBefore(a, h.childNodes[2]);
    h.insertBefore(d, a);
    h.insertBefore(k, d);
    h.appendChild(t);
  };
};

/**
 * 加载公共头部
 * @param {string} dom 挂载的dom节点，预设为'j-g-header'
 * @param {string} fs  加载的头部html文件，预设为‘./default/header/header.html’
 * @returns {promise}
 */
export const loadHeader = (dom, fs) =>
  new Promise(resolve => {
    $(dom).load(fs, function() {
      resolve();
    });
  });

/**
 * 加载公共尾部
 * @param {string} dom 挂载的dom节点，预设为'j-g-footer'
 * @param {string} fs  加载的尾部html文件，预设为‘./default/footer/footer.html’
 * @returns {promise}
 */
export const loadFooter = (dom, fs) =>
  new Promise(resolve => {
    $(dom).load(fs, function() {
      resolve();
    });
  });

/**
 * 加载loading
 * @param {string} dom 挂载的dom节点，预设为'j-g-footer'
 * @param {string} fs  加载的loading的html文件，预设为‘./default/loading/loading.html’
 * @returns {promise}
 */
export const loadLoading = (dom, fs) =>
  new Promise(resolve => {
    $(dom).load(fs, function() {
      resolve();
    });
  });

/**
 * 渲染数据到html上，用到了art-template模板引擎，用于一次性渲染
 * @param {string} tmpId 模板的scriptID,必须是id
 * @param {string} dom   挂载节点的类名，必须是id
 * @param {object} data  渲染的数据
 */
export const render = (tmpId, dom, data) => {
  const html = template(tmpId, data);
  document.getElementById(dom).innerHTML = html;
};

/**
 * 只用于加载图片
 * @param {string} url                   图片的url路径
 * @param {func} callback                加载完图片后的回调函数
 * @param {animatedClass} animated动画类  {可选} 加载完成时添加animated动画
 */
export const loadImage = (callback, url, animatedClass) => {
  const img = new Image();

  img.onload = () => {
    img.onload = null;
    callback(img);
  };

  !!animatedClass ? (img.className = `animated ${animatedClass}`) : "";
  img.src = url;
};

/**
 * 只用于加载单张大图的banner图方法,加载完后做些什么，通常在回调里关闭loading
 * @param {number} id                    请求的id
 * @param {func} callback                加载完图片的回调，调用了loadImage函数，就是loadImage的用回调函数
 * @param {animatedClass} animated动画类  {可选} 加载完成时添加animated动画
 */
export const renderBanner = (id, callback, animatedClass) => {
  api.getRow(id).then(res => {
    const imgUrl = res.data[0].img_url;
    loadImage(
      img => {
        callback && callback(img);
      },
      imgUrl,
      animatedClass
    );
  });
};
