app.controller('uploadCtrl', ['$scope', '$http', 'FileUploader', '$interval', function($scope, $http, FileUploader, $interval) {
    $scope.message = "This is message";

    var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $scope.uploader = new FileUploader({
        headers: {
            'X-CSRF-TOKEN': csrf_token // X-CSRF-TOKEN is used for Ruby on Rails Tokens
        },
        url: "/photos",
        formData: [{
            name: 'Huu Trung',
            age: 21,
        }, {
            first: 'huu',
            last: 'trung'
        }],
        //autoUpload: true,
    });

    //filter for image
    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
            console.log(item);
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    $scope.onClearQueue = function() {
        console.log("on clear queue");
        $scope.uploader.clearQueue();
    };

    $scope.onCancelItem = function(item) {
        console.log("on cancel item");
        $scope.uploader.cancelItem(item);
    };
    var index = 0;

    // When a file is added to the queue, settings from FileUpload are copied to FileItem.
    // So any changes to FileUpload options made after a file has been added to the queue will have no effect
    $scope.uploader.onBeforeUploadItem = function(item) {
        var data = {
            index: index,
        };
        index++;
        if (!item.formData) {
            item.formData = [];
        }
        item.formData.push(data);

    };

    $scope.onUploadAll = function() {
        $scope.uploader.uploadAll();
    };

    $scope.uploader.onAfterAddingFile = function(file) {
        console.log("on after adding file", file);
    };

}]);


////Cach xu ly post voi upload file nao thi up ngay file do, khi post xong van co quyen bam nut post va tiep tuc uploap cho
////hoan tat
//B1: set autoUpload: true de file nao len thi upload file do
//B2: Khi ma nguoi dung soan xong thi van co  quyen bam post
//B3: Khi bam post, thi chuyen post thanh dang upload ding
//B4: Bat su kien onCompleteAll, de thay tat ca cac file anh da upload hoan tat va tien hanh bat dau upload noi dung bai post
//B5: Sau khi upload noi dung bai post thanh cong thi hien thi thong bao thanh cong


////Cach xu ly khi bam button post thi moi tien hanh upload tat ca anh va noi dung
//Cach xu ly nay ko bi ro ri anh va co the dung photo nhu la nest object cua post
//B1: Chon file chi hien thi dung ng-thumb
//B2: Khi soan xong bam post, tien hanh upload noi dung bai viet tao ra post va tra ve id cua post
//B3: Sau khi tao post thanh cong, tien hanh upload all tat ca cac file. Dung onBeforeUploadItem callback de chen id post vao file upload
//B4: tim post bang id va add file anh vao post do
//B5: Bat su kien onCompleteAll de thong bao upload thanh

//Voi
// formData: [{
//                 name: 'Huu Trung',
//                 age: 21,
//             },{
//                 first: 'huu',
//                 last: 'trung'
//             }
//         ],
//tao ra params
// {"name":"Huu Trung","age":"21","first":"huu","last":"trung","controller":"photos","action":"create"}


//Xem xet lai carrierwave o nhung diem sau:
// 1. Khi gan imageUploader cho 1 document khac, va xoa document cu di thi cai image no co bi xoa hay ko
// 2. Lam sao de upload 1 image ma chi la tam thoi (cache), va co the gan no vao document khac tuy y
// 3. Xem chu ki song cua route va khi tat trinh duyet thi co can cai goi xong thi moi tat hay ko hay la tat thi ngat