(function(window){

    function FullPage(options){

        if(Object.prototype.toString.call(options) !== "[object Object]"){
            throw new Error('FullPage\'s options should be a object.')
        }
        
        var cover = document.querySelector('.fullpage-cover')
        cover.style.position = 'absolute'
        cover.style.top = 0
        cover.style.bottom = 0
        cover.style.left = 0
        cover.style.right = 0
        cover.style.overflow = 'hidden'
        
        var defaultOptions = {
            animateDuration: 500,
            animateType: 'ease',
            afterLoad: function(){}
        }

        var computedOptions = Object.assign({}, defaultOptions, options)

        var currentIndex = 0

        var $wrapper = document.querySelector('.wrapper'),
            $children = $wrapper.children

        var clientWidth = document.body.clientWidth,
            clientHeight = document.body.clientHeight

        function _initStyle(){
            clientWidth = document.body.clientWidth,
            clientHeight = document.body.clientHeight

            $wrapper.style.width = clientWidth * 3 + 'px'
            $wrapper.style.transition = 'all ' + computedOptions.animateDuration + 'ms ' + computedOptions.animateType

            console.log(computedOptions)
            
            Array.prototype.forEach.call($children, function(item, index){
                item.style.position = 'relative'
                item.style.overflow = 'hidden'
            })
            
            for(var i = 0, len = $children.length; i < len; i++){
                $children[i].style.height = clientHeight + 'px'
                $children[i].style.width = clientWidth + 'px'
            }

            $wrapper.style.transform = 'translate3d(0, 0, 0)'
        }

        var moving = false;

        document.addEventListener('mousewheel', function(e){
            e.preventDefault()
            var delta = e.wheelDelta
            _handleMove(delta)
        })

        function _handleMove(delta){
            if(!moving){
                if(delta < 0 ){
                    moving = true
                    currentIndex = currentIndex === $children.length - 1 ? currentIndex : currentIndex + 1
                    $wrapper.style.transform = 'translate3d(0, -' + currentIndex * clientHeight +'px, 0)'
                    setTimeout(function(){
                        moving = false
                        computedOptions.afterLoad.call(null, currentIndex)
                    },  computedOptions.animateDuration + 100)
                }else if(delta > 0){
                    moving = true
                    currentIndex = currentIndex === 0 ? currentIndex : currentIndex - 1
                    $wrapper.style.transform = 'translate3d(0, -' + currentIndex * clientHeight +'px, 0)'
                    setTimeout(function(){
                        moving = false
                        computedOptions.afterLoad.call(null, currentIndex)
                    }, computedOptions.animateDuration + 100)
                }
            }
        }

        window.addEventListener('resize', _initStyle)

        _initStyle();
        computedOptions.afterLoad.call(null, 0)
    }

    window.FullPage = FullPage

})(window)
