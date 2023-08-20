const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)
const heading=$('h2.name')
const cdThumb=$('.cd .cd-thumb')
const audio=$('#audio')
const inforname=$('.infor_song.wd-30 h3.name')
const inforauthor=$('.infor_song.wd-30 h5.author')
const inforimg=$('.img-thumb.tablet.wd-30')
const togglePlay=$('.btn-toggle-play')
const playbtn=$('.btn-play')
const textPlay=$('.text-play')
const player=$('.player')
const cd=$('.cd')
const timeCurrent = $('.timeCurrent');
const timeEnd = $('.timeEnd');
const progress=$('.progress')
const nextBtn=$('.btn-next')
const preBtn=$('.btn--previous')
const randomBtn=$('.btn-random')
const repeatBtn=$('.btn--repeat')
const playlist=$('.song_lists')
const volumeRange = $('.volumeRange');
const volumeMax = $('.songVolume .icon-volume-max');
const volumeMute = $('.songVolume .icon-volume-mute');
const iconVolume = $('.icon-volume');
const PLAYER_STRORAGEKEY='F8_PLAYER'
const app={
    currentIndex:0,
    isPlaying: false,
    isRandom:false,
    isRepeat:false,
    isVolumeMax: true,
    config:JSON.parse(localStorage.getItem(PLAYER_STRORAGEKEY))||{},

    songs: [
        {   
            id: 1,
            name: 'À Lôi',
            author: 'Double2T',
            image: './image/double2t.jpg',
            path: './music/aloi.mp3'   
        },
            {
            id: 2,
            name: 'Lời Tâm Sự Thứ 3',
            author: 'MikeLodic',
            image: './image/mike.jpg',
            path: './music/loitamsuso3.mp3'
        },
            {
            id: 3,
            name: 'Em Iu',
            author: 'Andree Right Hand',
            image: './image/andree1.jpg',
            path: './music/emiu.mp3'
        },
            {
            id: 4,
            name: 'Chơi Như Tụi Mỹ',
            author:'Andree Right Hand',
            image: './image/andree2.jpg',
            path: './music/my.mp3' 
        },
        {
            id: 5,
            name: 'Nụ Hôn Bisou',
            author: 'MikeLodic',
            image: './image/mike2.jpg',
            path: './music/bisu.mp3'
        },
        {
            id: 6,
            name: 'Khúc Ca Vàng',
            author: 'MikeLodic',
            image: './image/mike2.jpg',
            path: './music/khuccavang.mp3'
        },
        {
            id: 7,
            name: 'Người Miền Núi Chất',
            author: 'Double2T',
            image: './image/double2t.jpg',
            path: './music/nguoinui.mp3'
        },
        {
            id: 8,
            name: 'Nên Chờ Hay Nên Quên',
            author: 'Phan Duy Anh',
            image: './image/1.jpg',
            path: './music/nencho.mp3'
        },
        {
            id: 8,
            name: 'Ai Bình Yên Hơn Ai Đậm Sâu Hơn',
            author: 'Dương Yến Phi',
            image: './image/1.jpg',
            path: './music/aibinhyenhon.mp3'
        },
        {
            id: 9,
            name: 'Tại Vì Sao',
            author: 'MCK',
            image: './image/mck1.jpg',
            path: './music/taivisao.mp3'
        },
        {
            id: 10,
            name: 'Chìm Sâu',
            author: 'MCK',
            image: './image/mck1.jpg',
            path: './music/himsau.mp3'
        },
        {
            id: 11,
            name: 'Chỉ Một Đêm Nữa Thôi',
            author: 'MCK',
            image: './image/mck2.jpg',
            path: './music/chi1dem.mp3'
        },
        {
            id: 12,
            name: 'Chú Đại Bi',
            author: 'Maseư',
            image: './image/masew.jpg',
            path: './music/chudaibi.mp3'
        },
        {
            id: 13,
            name: 'Hoa Cỏ Lau',
            author: 'Phong Max',
            image: './image/1.jpg',
            path: './music/hoacolau.mp3'
        },
        {
            id: 14,
            name: 'Khuất Lối',
            author: 'H-Kray',
            image: './image/1.jpg',
            path: './music/khuatloi.mp3'
        },
        {
            id: 15,
            name: 'Thuyền Quyên',
            author: 'Diệu Kiên',
            image: './image/1.jpg',
            path: './music/thuyenquyen.mp3'
        },
        {
            id: 16,
            name: 'Quá Khứ Anh Không Thể Quên',
            author: 'Diệu Kiên',
            image: './image/1.jpg',
            path: './music/quakhu.mp3'
        },
        {
            id: 17,
            name: 'Nhường Hạnh Phúc Cho Anh',
            author: 'Ngọc Kayla',
            image: './image/1.jpg',
            path: './music/choanhh.mp3'
        },
        ],
        setConfig:function(key,value){
            this.config[key]=value;
            localStorage.setItem(PLAYER_STRORAGEKEY,JSON.stringify(this.config))
        },
        render:function(){
            var htmls=this.songs.map((song,index) => {
                return`
                <div class="song ${index==this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="infor">
                      <div class="img-thumb" style="background-image: url('${song.image}');"></div>
                      <div class="infor_song">
                        <h3 class="name">${song.name}</h3>
                            <h5 class="author">${song.author}</h5>
                      </div>
                    </div>
                    <div id="time-music-${song.id}"></div>
                   </div>
                `
            })
            $('.song_lists').innerHTML=htmls.join('')
        },
        defineProperties: function(){
            Object.defineProperty(this,'currentSong',{
                get: function(){
                    return this.songs[this.currentIndex]
                }
            })
        },
        loadCurrentSong:function(){
            heading.textContent=this.currentSong.name
            cdThumb.style.backgroundImage=`url('${this.currentSong.image}')`
            audio.src=this.currentSong.path
            inforname.textContent=this.currentSong.name
            inforauthor.textContent=this.currentSong.author
            inforimg.style.backgroundImage=`url('${this.currentSong.image}')`
            this.durationOfSOng();
        },
        handleEvents: function(){
            const _this=this;
            //xử lý cd quay và dừngcd
            const cdThumbAnimate= cdThumb.animate([{
                transform: 'rotate(360deg)'
                }], {
                    duration: 10000,
                    iterations: Infinity
            })
            cdThumbAnimate.pause()
//xử lý khi play
            togglePlay.onclick=function(){
                if(_this.isPlaying){
                    audio.pause()
                }
                else{
                audio.play()
                }
            }
            playbtn.onclick=function(){
                if(_this.isPlaying){
                    audio.pause()
                }
                else{
                audio.play()
                }
            }
            //khi song được play
            audio.onplay=function(){
                _this.isPlaying=true;
                player.classList.add('playing')
                cd.classList.add('playing')
                textPlay.textContent='ĐANG PHÁT'
                cdThumbAnimate.play()
            }
             //khi song được pAUSE
             audio.onpause=function(){
                cd.classList.remove('playing')
                _this.isPlaying=false;
                player.classList.remove('playing')
                textPlay.textContent='TIẾP TỤC PHÁT'
                cdThumbAnimate.pause()
            }
            //khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function(){
                var currentTime = app.formatTime(audio.currentTime)
                timeCurrent.textContent=currentTime
                var endTime=app.formatTime(audio.duration)
             if(audio.duration)
             {const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
             progress.value = progressPercent}
             if (endTime != 'NaN:NaN') {
                timeEnd.textContent = endTime
                }
            }
            //xử lý khi tua
            progress.oninput=function(e){
                const seektime=audio.duration / 100 * e.target.value
                audio.currentTime=seektime
            }
            nextBtn.onclick=function(){
                if(_this.isRandom){
                    _this.playRandom()
                }else{
                    _this.nextSong()
                }
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
                _this.durationOfSOng()
            }
            preBtn.onclick=function(){
                if(_this.isRandom){
                    _this.playRandom()
                }else{
                    _this.previous()
                }
                audio.play()
                _this.render()
                _this.scrollToActiveSong()
                _this.durationOfSOng()
            }
            randomBtn.onclick=function(e){
                _this.isRandom = !_this.isRandom
                _this.setConfig('isRandom',_this.isRandom)
                randomBtn.classList.toggle('active',_this.isRandom)
            }
                //repeat xu ly phat lai 1 bai hat
            repeatBtn.onclick = function(){
                    _this.isRepeat= !_this.isRepeat
                    _this.setConfig('isRepeat',_this.isRepeat)
                    repeatBtn.classList.toggle('active',_this.isRepeat)
                }
                //xu ly khi let thuc bai het
            audio.onended=function(){
               if(_this.isRepeat){
                audio.play()
               }
               else{
                nextBtn.onclick()  // tu bam click vao nut next khi het bai
               }
            }

            //lang nghe hanh vi click vao playlist
        playlist.onclick=function(e){
            const songNode=e.target.closest('.song:not(.active)')
            if(songNode){
                _this.currentIndex=Number(songNode.dataset.index) // =songNode.getAtribute('data-index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
                _this.durationOfSOng()
            }
        }
// Xử lí sự kiện tăng giảm âm lượng
        volumeRange.oninput = function(e){
            audio.volume = e.target.value;
            if(e.target.value == 0){
                volumeMute.style.display = 'block';
                volumeMax.style.display = 'none';
            } else {
                volumeMax.style.display = 'block';
                volumeMute.style.display = 'none';

            }
        }
        // Xử lí sự kiện max hoặc mute volume bằng cách ấn vào icon
        iconVolume.onclick = function(){
                if(_this.isVolumeMax){
                    volumeMute.style.display = 'block';
                    volumeMax.style.display = 'none';
                    volumeRange.value = 0;
                    audio.volume = 0;
                    _this.isVolumeMax = false;
                } else {
                    volumeMax.style.display = 'block';
                    volumeMute.style.display = 'none';
                    volumeRange.value = 1;
                    audio.volume = 1;
                    _this.isVolumeMax = true;
                    
                }
            }
        },

          // Hàm chuyển đổi thời gian
          formatTime: function(number){
            const minutes = Math.floor(number / 60);
            const seconds = Math.floor(number % 60);
            const fomattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            return fomattedTime;
        },


        loadConfig: function(){
            this.isRandom=this.config.isRandom
            this.isRepeat=this.config.isRepeat
        },


        //hàm nextSong
        nextSong: function(){
            this.currentIndex++;
            if(this.currentIndex >= this.songs.length){
                this.currentIndex=0
            }
            this.loadCurrentSong()
        },
        //nut quay lai
        previous:function(){
            this.currentIndex--;
            if(this.currentIndex<0){
                this.currentIndex=this.songs.length-1
            }
            this.loadCurrentSong()
        },
        //randombaihat
        playRandom: function(){
            let randomsong;
        do{ randomsong=Math.floor(Math.random() * this.songs.length)
            } while(randomsong===this.currentIndex)
            this.currentIndex=randomsong
            console.log(this.currentIndex)
        this.loadCurrentSong()
        },
        scrollToActiveSong: function(){
            if(this.currentIndex == 0 ){

                $('.song.active').scrollIntoView(
                    { 
                        behavior: "smooth",
                        block: "nearest",
                    });
            } else {
                $('.song.active').scrollIntoView(
                    { 
                        behavior: "smooth", 
                        block: "center",
                    });
            }
        },

                  // Hàm Lấy thời gian của từng bài hát
        durationOfSOng:function(){
            this.songs.map(function(song,index){
                const timeMusic = document.getElementById("time-music-"+ song.id)
                var pathMusic = song.path;
                var audio = new Audio(pathMusic);

                audio.addEventListener('loadedmetadata', function(){
                    timeMusic.innerHTML = app.formatTime(audio.duration);
                })
            })
        },

        start: function(){
            //gan cau hinh tu config vao object app
            this.loadConfig()
//render lại tên các bài hát
            this.render()
            //định nghĩa các thuộc tính cho object
      this.defineProperties()
      //lắng nghe xử lý các sự kiện 
      this.handleEvents()
      //tair thông tin bài hát đầu tiên vào cd khi chạy ứng dụng
      this.durationOfSOng();
      this.loadCurrentSong()


      //hien thi tragn thai ban dau cua buton repeat va random
      randomBtn.classList.toggle('active',this.isRandom)
      repeatBtn.classList.toggle('active',this.isRepeat)
        }
}

app.start()
