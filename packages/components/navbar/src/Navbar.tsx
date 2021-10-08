import * as React from 'react';
import * as S from './Navbar.styles';
import { NavbarProps } from './Navbar.types';

const Navbar: React.FC<NavbarProps> & { Divider: typeof S.NavbarDivider } = props => {
  const { className, color, logo, description, children, actions, additionalNodes, alertNotification } = props;

  return (
    <S.Navbar className={`ds-navbar ${className || ''}`} color={color}>
      {typeof logo === 'string' ? <img src={logo} alt="" /> : logo}
      <S.NavbarDivider />
      <S.NavbarDescription>{description}</S.NavbarDescription>
      {alertNotification && (
        <>
          <S.NavbarAlertNotification>{alertNotification}</S.NavbarAlertNotification>
          <S.NavbarDivider />
        </>
      )}
      {additionalNodes &&
        additionalNodes.map(node => (
          <>
            <S.AdditionalNode>{node}</S.AdditionalNode>
            <S.NavbarDivider />
          </>
        ))}
      <S.NavbarActions>
        <div>
          <S.NavbarActionsWrapper>{actions}</S.NavbarActionsWrapper>
        </div>
        {children}
      </S.NavbarActions>
    </S.Navbar>
  );
};

Navbar.Divider = S.NavbarDivider;
export default Navbar;
