app.controller('homeCtrl', ['$scope', '$http', '$upload', '$interval', function($scope, $http, $upload, $interval) {
    $scope.message = "This is message";
    // $http.get("/check/trungnguyenhuu.json")
    //  .succcess(function(data, status) {
    //      alert("Ok");
    //  })
    //  .error(function(data, static) {
    //      alert("error");
    //  });


    // $scope.$watch('files', function (newValue) {
    //  // console.log("on watch file");
    //  //      $scope.upload($scope.files);
    //     console.log(newValue);
    //   });

    // $scope.upload = function() {
    //     var files = $scope.files;
    //     console.log("on Upload");
    //     if (files && files.length) {
    //         for (var i = 0; i < files.length; i++) {
    //             var file = files[i];
    //             $upload.upload({
    //                 url: '/photos',
    //                 file: file,
    //             }).progress(function(evt) {
    //                 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //                 $scope.width = progressPercentage;
    //                 console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
    //             }).success(function(data, status, headers, config) {
    //                 console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    //             }).error(function() {
    //                 console.log("error on upload");
    //             });
    //         }
    //     }
    // };
    // $scope.width = 0;
    // var intervalPromise = $interval(function(){
    //     $scope.width = $scope.width + 20;
    //     if($scope.width >= 100){
    //         $interval.cancel(intervalPromise);
    //     }
    // }, 1000);


    $scope.post = {
        title: '',
        body: '',
        photos: [],
    };

  
    $scope.onPost = function() {
        $http.post("/posts", $scope.post).success(function(data) {
            console.log(data);
        }).error(function(data) {
            console.log(data);
        });
        // console.log($scope.post);
    };

    //Add file moi thi upload no len
    $scope.$watch('file', function(newValue) {
        console.log("on watch file");
        console.log(newValue);
        $scope.upload(newValue);
    });

    //Tien hanh upload
    $scope.upload = function(file) {
        console.log("on Upload");
        if (file) {
            $upload.upload({
                url: '/photos',
                file: file,
            }).progress(function(evt) {

            }).success(function(data, status, headers, config) {
                console.log("on success upload");
                console.log(data);
                //Upload thanh cong dua no vao photos cua post

              
                $scope.post.photos.push({
                    id: data._id.$oid,
                    image: data.image.thumb.url,
                });
                console.log("here");
                console.log($scope.post.photos);
            }).error(function() {
                console.log("error on upload");
            });
        }
    };

}]);