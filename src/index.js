const viewerStyle = {
  position: 'fixed',
  display: 'none',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  cursor: 'zoom-out',
  'background-color': 'rgba(0, 0, 0, .6)'
}

const previewStyle = {
  position: 'fixed',
  left: '50%',
  top: '50%',
  cursor: 'default',
  transform: 'translate3D(-50%, -50%, 0)'
}

const closeStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  'font-size': '20px',
  color: '#fff'
}

const createStyleText = (sel, style) => {
  let text = `${sel} {\n`
  for (let item in style) {
    text += `  ${item}: ${style[item]};\n`
  }
  text += '}\n'
  return text
}

const createElement = (tagName, attrs) => {
  const tag = document.createElement(tagName)
  for (let item in attrs) {
    tag.setAttribute(item, attrs[item])
  }
  return tag
}

class Zoomme {
  constructor({
    container
  }) {
    container.addEventListener('click', e => {
      const target = e.target
      switch (target.tagName) {
        case 'IMG':
          const src = target.getAttribute('src')
          this.createPreview(src)
          this.viewer.style.display = 'block'
          break
        default:
          this.viewer.style.display = 'none'
          break
      }
    })
    this.document = container.ownerDocument
    this.createViewer()
    this.createStyle()
  }

  createStyle() {
    const style = createElement('style', { text: 'text/css' })

    let text = createStyleText('.zoomme-viewer', viewerStyle) +
      createStyleText('.zoomme-viewer .zoomme-preview', previewStyle) +
      createStyleText('.zoomme-viewer .zoomme-close', closeStyle)
    style.textContent = text
    this.document.head.appendChild(style)
  }

  createViewer() {
    const viewer = createElement('div', { class: 'zoomme-viewer' })
    this.document.body.appendChild(viewer)
    this.viewer = viewer
  }

  createPreview(src) {
    const preview = createElement('img', { class: 'zoomme-preview', src })
    this.viewer.appendChild(preview)
  }
}

module.exports = Zoomme
