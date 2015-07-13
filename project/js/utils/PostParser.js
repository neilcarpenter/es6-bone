class PostParser {

    static getRichText( post ) {

        const type = PostParser._getPostType(post);
        let richText;

        if (type === 'twitter') {
            richText = PostParser._getRichText_TW(post.text);
        } else if (type === 'instagram') {
            richText = PostParser._getRichText_IG(post.text);
        }

        return richText;

    }

    static _getRichText_TW(text) {

        const exp1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        text = text.replace(exp1, "<a href='$1' target='_blank'>$1</a>");

        const exp2 = /#(\w+)/g;
        text = text.replace(exp2, "<a href='http://twitter.com/search?q=%23$1' target='_blank'>#$1</a>");

        const exp3 = /@(\w+)/g;
        text = text.replace(exp3, "<a href='http://www.twitter.com/$1' target='_blank'>@$1</a>");

        return text;

    }

    static _getRichText_IG(text) {

        const exp1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        text = text.replace(exp1, "<a href='$1' target='_blank'>$1</a>");

        const exp2 = /@(\w+)/g;
        text = text.replace(exp2, "<a href='http://www.instagram.com/$1' target='_blank'>@$1</a>");

        return text;

    }

    static getUsernameLink( post ) {

        const type = PostParser._getPostType(post);
        let nameLink;

        if (type === 'twitter') {
            nameLink = PostParser._getUsernameLink_TW(post);
        } else if (type === 'instagram') {
            nameLink = PostParser._getUsernameLink_IG(post);
        }

        return nameLink;

    }

    static _getUsernameLink_TW(postData) {

        return `<a href="http://twitter.com/${postData.user.screen_name}" target="_blank">@${postData.user.screen_name}</a>`;

    }

    static _getUsernameLink_IG(postData) {

        return `<a href="http://instagram.com/${postData.user.screen_name}" target="_blank">@${postData.user.screen_name}</a>`;

    }

    static _getPostType( post ) {

        return /instagram/.test(post.source) ? 'instagram' : 'twitter';

    }

}

export default PostParser;
