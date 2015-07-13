/*
Sharing class for non-SDK loaded social networks.
If SDK is loaded, and provides share methods, then use that class instead, eg. `Facebook.share` instead of `Share.facebook`
*/
class Share {

    url = null;

    constructor() {

        this.url = this.__NAMESPACE__().BASE_PATH;

    }

    openWin(url, w, h) {

        const left = ( screen.availWidth  - w ) >> 1;
        const top  = ( screen.availHeight - h ) >> 1;

        window.open(url, '', 'top='+top+',left='+left+',width='+w+',height='+h+',location=no,menubar=no');

    }

    plus(url='') {

        url = encodeURIComponent(url || this.url);

        this.openWin(`https://plus.google.com/share?url=${url}`, 650, 385);

    }

    pinterest(url='', media='', descr='') {

        url   = encodeURIComponent(url || this.url);
        media = encodeURIComponent(media);
        descr = encodeURIComponent(descr);

        this.openWin(`http://www.pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${descr}`, 735, 310);

    }

    tumblr(url='', media='', descr='') {

        url   = encodeURIComponent(url || this.url);
        media = encodeURIComponent(media);
        descr = encodeURIComponent(descr);

        this.openWin(`http://www.tumblr.com/share/photo?source=${media}&caption=${descr}&click_thru=${url}`, 450, 430);

    }

    facebook(url='', copy='') {

        url         = encodeURIComponent(url || this.url);
        const decsr = encodeURIComponent(copy);

        this.openWin(`http://www.facebook.com/share.php?u=${url}&t=${decsr}`, 600, 300);

    }

    twitter(url='', copy='') {

        url = encodeURIComponent(url || this.url);
        if (copy === '') {
            copy = this.__NAMESPACE__().locale.get('seo_twitter_card_description');
        }
        const descr = encodeURIComponent(copy);

        this.openWin(`http://twitter.com/intent/tweet/?text=${descr}&url=${url}`, 600, 300);

    }

    renren(url='') {

        url = encodeURIComponent(url || this.url);

        this.openWin(`http://share.renren.com/share/buttonshare.do?link=${url}`, 600, 300);

    }

    weibo(url='') {

        url = encodeURIComponent(url || this.url);

        this.openWin(`http://service.weibo.com/share/share.php?url=${url}&language=zh_cn`, 600, 300);

    }

    __NAMESPACE__() {

        return window.__NAMESPACE__;

    }

}

export default Share;
