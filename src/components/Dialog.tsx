import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button } from 'components/Button';

const DialogMain = styled.div`
border-radius: 4px;
    background: white;
  box-shadow: 0 0 3px grey;
  min-width: 15em;
  max-width: 90%;
`
const DialogOverlay = styled.div`
position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 10;
`

const DialogWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
`
const Header = styled.header`
    padding: 12px 16px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
`
const CloseIcon = styled.span`
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
`
const Content = styled.main`
    padding: 12px 16px;

`
const Footer = styled.footer`
    border-top: 1px solid #d9d9d9;
    padding: 12px 16px;
    text-align: right;
    button + button{
        margin-left: 4px;
    };
    button{
        background:#9ccac0;
    }
`

type Props = {
    type: 'confirm' | 'alert',
    visible?: boolean,
    onClose?: () => any,
    okHandler?: () => any,
    cancelHandler?: () => any
    header: any,
    content: any,
}

const Dialog: React.FC<Props> = (props) => {
    const { header, content, type, visible, onClose, okHandler, cancelHandler } = props

    useEffect(() => {
        console.log("show change", visible);
    }, [visible]);
    const onClickOverlay = () => {
        onClose && onClose()
    }
    const onClickOK = () => {
        okHandler && okHandler()
        onClose && onClose()
    }
    const onClickCancel = () => {
        cancelHandler && cancelHandler()
        onClose && onClose()
    }
    if (!visible) return null
    const children = (<div>
        <DialogOverlay onClick={onClickOverlay}></DialogOverlay>
        <DialogWrapper>
            <DialogMain>
                <Header>{header}<CloseIcon onClick={onClickCancel} /></Header>
                <Content>{content}</Content>
                <Footer>
                    <Button onClick={onClickOK}>确认</Button>
                    {type === 'confirm' ? <Button onClick={onClickCancel}>取消</Button> : null}
                </Footer>
            </DialogMain>
        </DialogWrapper>
    </div>
    )
    return ReactDOM.createPortal(children, document.body)
}


export { Dialog }