import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
    background: #000;
`;

export const Header = styled.View`
    height: 50px;
    padding: 0 16px;
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
`;

export const HeaderContainer = styled.View`
    flexDirection: row;
`;

export const Title = styled.Text`
    fontFamily: 'Nunito_800ExtraBold';
    marginRight: 10px;
    color: #FFF
`;