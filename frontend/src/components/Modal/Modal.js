import ReactDOM from 'react-dom'
import close_svg from '../../assets/svg/close-svg.svg'

const Modal = (props) => {
  return ReactDOM.createPortal((
    <div className='modal' onClick={props.toggler}>
      <div className='modal-child-div' onClick={(e) => { e.stopPropagation() }}>
        {props.children}
        <div className='modal-close-btn'>
          <img src={close_svg} alt='close-button' onClick={props.toggler}></img>
        </div>
      </div>
    </div>
  ),
    document.getElementById('modal')
  )
}

export default Modal