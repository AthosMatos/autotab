import styled from "styled-components"

const IMG = styled.img`
    width: 100px;
    height: 100px;
    margin: 0;
    padding: 0;
`
const APPLogoText = styled.p`
    font-family: Inkfree;
    color: #bdbdbd;
    margin: 0;
    padding: 0;
`
const APPLogoTextClean = styled.p`
    color: #797979;
    font-weight: bolder;
    margin: 0;
    padding: 0;
    text-decoration: none;
`
const APPLogoLink = styled.a`
    color: #797979;
    font-weight: bolder;
    margin: 0;
    padding: 0;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`
const APPLogoView = styled.a`
    position: absolute;
    left: 20px;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;  
`
const APPLogoTextView = styled.a`
    left: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;  
`

export const AppLogo = () => {
    return (
        <APPLogoView>
            <IMG src={require('../../assets/icons/AutoTABIcon_BW.png')} />
            <APPLogoTextView>
                <APPLogoText>Developed by Athos</APPLogoText>
                <APPLogoTextClean>ladiesman217.as@gmail.com</APPLogoTextClean>
                <APPLogoLink href='https://github.com/AthosMatos'>GitHub: @AthosMatos</APPLogoLink>
                <APPLogoLink href='https://www.linkedin.com/in/athosmatos/'>Linkedin: athosmatos</APPLogoLink>

            </APPLogoTextView>
        </APPLogoView>
    )
}

