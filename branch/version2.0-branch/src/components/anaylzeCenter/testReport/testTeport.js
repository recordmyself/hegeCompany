import $ from 'jquery'
export function showSelect(e) {
  $('#selected').show().animate({
    top: Number(e.pageY - 60) + 'px',
  })
}
