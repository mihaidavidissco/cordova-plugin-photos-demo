var app = {
    offset: 0,
    albumsIds: [],

    initialize: function() {
        var btnEl = document.getElementById('loadMoreBtn');
        btnEl.onclick = function() {
            app.onLoadMoreClick();
        };
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        var parentElement = document.getElementById('albums');
        Photos.collections({"collectionMode": "ALBUMS"},
            function(albums) {
                for (var i=0; i<albums.length; i++) {
                    app.albumsIds.push(albums[i].id);
                    var para = document.createElement("P");
                    var t = document.createTextNode(albums[i].name);
                    para.appendChild(t);
                    parentElement.appendChild(para);
                }
                app.addPhotos();
            },
            function(error) {
                console.error("Error: " + error);
            });
    },

    onLoadMoreClick() {
        app.offset += 10;
        app.addPhotos();
    },

    addPhotos() {
        var parentElement = document.getElementById('photos');
        Photos.photos(app.albumsIds,
            {"offset": app.offset, "limit": 10},
            function(photos) {
                Photos.cancel();
                for (var i=0; i<photos.length; i++) {
                    Photos.thumbnail(photos[i].id,
                        {"asDataUrl": true, "dimension": 100, "quality": 70},
                        function(data) {
                            var img = document.createElement("img");
                            img.src = data;
                            parentElement.appendChild(img);
                        },
                        function(error) {
                            console.error("Error: " + error);
                        });
                }
        }, console.error);
    }
};

app.initialize();