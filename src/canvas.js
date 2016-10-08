/**
 * canvas画像オブジェクト
 *
 * 画像をキャンパスへ描画する基本的な流れ
 * <ul>
 *     <li>img要素を作成(ノードには追加しない)
 *     <li>img要素に画像を読込
 *     <li>img要素をcanvasへ描画
 * </ul>
 *
 * @author Hiroshi Sawai <info@info-town.jp> https://gist.github.com/s-hiroshi/4050946
 * @author Yuko Oshima <yukotan@gmail.com>
 * TODO: こちらの実装を参考にReact内に組み込む
 */

// jQuery(function($) {
//
//     // API KEY 隠し
//     $('#labelapikey').click(function() {
//         $('#apikey').slideToggle('slow');
//     });
//
//     var inputImg;
//     var inputCanvas = $('<canvas>').appendTo($('#input-view')).get(0);
//     var inputCxt;
//
//     // エラー表示
//     function alert(text) {
//         window.alert(text);
//     }
//
//     // img要素が存在すればtrue。存在しなければアラートを表示しfalseを返す。
//     function checkImage () {
//         if (($(inputImg).length  > 0) === false ) {
//             alert('not image.');
//             return false;
//         }
//         return true;
//     }
//
//     // 読込画像タイプの確認
//     // 適切な画像タイプならばtrue。対応していないタイプならばアラートを表示してfalseを返す
//     function checkFileType(text) {
//         // ファイルタイプの確認
//         if (text.match(/^image\/(png|jpeg|gif)$/) === null) {
//             alert('対応していないファイル形式です。\nファイルはPNG, JPEG, GIFに対応しています。');
//             return false;
//         }
//         return true;
//     }
//
//     /*
//      * 画像表示処理
//      */
//     // 画像読込ハンドラ
//     function read(reader) {
//         return function() {
//             // imgへオブジェクトを読み込む
//             inputImg = $('<img>').get(0);
//             inputImg.onload = function() {
//                 try {
//                     var inputWidth = $('#input-view').width();
//                     // resize image
//                     if (inputWidth < inputImg.width) {
//                         var scale = inputWidth / inputImg.width;
//                         dstWidth = inputImg.width * scale;
//                         destHeight = inputImg.height * scale;
//                         inputCanvas.width = inputWidth;
//                         inputCanvas.height = inputImg.height * scale;
//                         inputCxt.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
//                         inputCxt.drawImage(inputImg, 0, 0, inputImg.width, inputImg.height, 0, 0, dstWidth, destHeight);
//                     } else {
//                         inputCanvas.width = inputImg.width;
//                         inputCanvas.height = inputImg.height;
//                         inputCxt.clearRect(0, 0, inputCanvas.width, inputCanvas.height);
//                         inputCxt.drawImage(inputImg, 0, 0, inputImg.width, inputImg.height);
//                     }
//                 } catch (e) {
//                     alert('couldn\'t load image');
//                 }
//             };
//             inputImg.setAttribute('src', reader.result);
//             $('pre#result').text('');
//         };
//     }
//
//     // URLからの画像読込処理
//     $('#getimg').change (function() {
//         var file, reader;
//
//         // 選択したファイル情報
//         file = this.files[0];
//
//         // ファイルタイプの確認
//         if (checkFileType(file.type) === false) {
//             return false;
//         }
//
//         // inputCxt作成
//         inputCxt = inputCanvas.getContext('2d');
//
//         // canvasに描画
//         reader = new FileReader();
//         reader.onload = read(reader);
//         reader.readAsDataURL(file);
//
//     });
//
//     // ファイル参照ボタンを使う読込処理
//     $('#upload').change (function() {
//         var file, reader;
//
//         // 選択したファイル情報
//         file = this.files[0];
//
//         // ファイルタイプの確認
//         if (checkFileType(file.type) === false) {
//             return false;
//         }
//
//         // inputCxt作成
//         inputCxt = inputCanvas.getContext('2d');
//
//         // canvasに描画
//         reader = new FileReader();
//         reader.onload = read(reader);
//         reader.readAsDataURL(file);
//
//     });
//
//     /*
//      * ドラッグアンドドロップの読込処理
//      */
//     $('#input-view').get(0).ondragover = function() {
//         return false;
//     };
//
//     // bind('ondrop', function() {});はうまく動かなかった(2012.11.07)
//     $('#input-view').get(0).ondrop = function(event) {
//
//         var dt, file, reader, droptype, imageurl, imagefile;
//
//         dt = event.dataTransfer;
//         droptype = dt.types[0];
//         // ローカルのファイルをドロップした場合
//         if (droptype == 'Files') {
//             file = event.dataTransfer.files[0];
//         } else {
//             alert('couldn\'t open image.');
//             return false;
//         }
//
//         // ファイルタイプの確認
//         if (checkFileType(file.type) === false) {
//             return false;
//         }
//
//         // inputCxt作成
//         inputCxt = inputCanvas.getContext('2d');
//
//         // canvasへの描画
//         reader = new FileReader();
//         reader.onload = read(reader);
//         reader.readAsDataURL(file);
//
//         // バブリング・デフォルト処理停止
//         return false;
//     };
//
//     /*
//      * 実行
//      */
//     $('#getResult').click(function() {
//
//         apikey = $('#apikey').val();
//         requestURI = 'https://vision.googleapis.com/v1/images:annotate?key='+apikey;
//         apiType = $('#apitype').val();
//         maxResult = $('#maxresult').val();
//
//         if (apikey.length === 0) {
//             alert('API KEYを入力してください。');
//             return false;
//         }
//         if (apiType.length === 0) {
//             alert('リクエストタイプを選択してください。');
//             return false;
//         }
//         if (checkImage() === false) {
//             alert('画像を指定してください。');
//             return false;
//         }
//
//         // loading
//         $('pre#result').text('loading...');
//
//         var dataURL = inputCanvas.toDataURL();
//         var imgDataArray = dataURL.split(",");
//         var imgData = imgDataArray[1];
//
//         // make request body
//         var requestBody = {
//                 "requests":{
//                     "image":{
//                         "content": imgData
//                     },
//                     "features":{
//                         "type": apiType
//                         ,"maxResults":maxResult
//                     }
//                 }
//             }
//
//         // post and view result
//         $.ajax({
//             type: 'POST',
//             url: requestURI,
//             data: JSON.stringify(requestBody),
//             contentType: 'application/json',
//             dataType: 'json',
//             success: function(response){
// //                result =  JSON.stringify(response, null, "\t");
//                 result =  JSON.stringify(response, null, '  ');
//                 $('pre#result').text(result);
//             },
//             error: function(req, err){
//                 $('pre#result').text(req.responseText);
//             }
//         });
//
//     });
//
// });
