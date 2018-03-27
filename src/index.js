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
  'max-width': '100%',
  'max-height': '100%',
  cursor: 'default',
  transform: 'translate3D(-50%, -50%, 0)'
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
          this.setPreviewSrc(src)
          this.viewer.style.display = 'block'
          break
        default:
          this.viewer.style.display = 'none'
          break
      }
    })
    this.document = container.ownerDocument

    // create DOM
    this.createViewer()
    this.createPreview()
    this.createStyle()
  }

  createStyle() {
    const style = createElement('style', { text: 'text/css' })
    const text = createStyleText('.zoomme-viewer', viewerStyle) +
      createStyleText('.zoomme-viewer .zoomme-preview', previewStyle)

    style.textContent = text
    this.document.head.appendChild(style)
  }

  createViewer() {
    const viewer = createElement('div', { class: 'zoomme-viewer' })
    this.document.body.appendChild(viewer)
    this.viewer = viewer
  }

  createPreview() {
    const preview = createElement('img', { class: 'zoomme-preview' })
    this.preview = preview
    this.viewer.appendChild(preview)
  }

  setPreviewSrc(src) {
    this.preview.setAttribute('src', src)
  }
}

module.exports = Zoomme
