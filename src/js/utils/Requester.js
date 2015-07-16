/*
Requester
- Wrapper for `$.ajax` calls
*/

class Requester {

    static requests = [];

    static request( data ) {
        /*
        `data = {`<br>
        `  url         : String`<br>
        `  type        : "POST/GET/PUT"`<br>
        `  data        : Object`<br>
        `  dataType    : jQuery dataType`<br>
        `  contentType : String`<br>
        `}`
        */

        const r = $.ajax({
            url         : data.url,
            type        : data.type ? data.type : "POST",
            data        : data.data ? data.data : null,
            dataType    : data.dataType ? data.dataType : "json",
            contentType : data.contentType ? data.contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            processData : (data.processData !== null && data.processData !== undefined) ? data.processData : true

        });

        r.done(data.done);
        r.fail(data.fail);
        
        return r;

    }

    static addImage(data, done, fail) {
        /*
        ** Usage: <br>
        `data = canvass.toDataURL("image/jpeg").slice("data:image/jpeg;base64,".length)`<br>
        `Requester.addImage data, "zoetrope", @done, @fail`
        */

        Requester.request({
            url    : '/api/images/',
            type   : 'POST',
            data   : { image_base64 : encodeURI(data) },
            done   : done,
            fail   : fail
        });

    }

    static deleteImage(id, done, fail) {
        
        Requester.request({
            url    : '/api/images/'+id,
            type   : 'DELETE',
            done   : done,
            fail   : fail
        });

    }

}

export default Requester;
    