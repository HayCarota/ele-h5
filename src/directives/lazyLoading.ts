import type { App, DirectiveBinding } from 'vue';

const vLazy = (observer: IntersectionObserver) => {
  return {
    beforeMount: (el: HTMLImageElement, binding: DirectiveBinding) => {
      el.classList.add('op-lazyload')
      const { value } = binding
      // <image data-origin="value">
      el.dataset.origin = value
      observer.observe(el)
    }
  }
}
const lazyPlugin = {
  install(app: App) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 开始加载图片，把 data-origin 的值放到 src
            const el = entry.target as HTMLImageElement
            el.src = el.dataset.origin as string
            el.classList.remove('op-lazyload')
            // 停止监听
            observer.unobserve(el)
          }
        })
      },
      { rootMargin: '0px 0px -100px 0px' }// 交叉视图100px，开始派发
    )
    app.directive('lazy', vLazy(observer))
  }
}

export default lazyPlugin
