import { Button } from "../../..";
import { useDispatch, useSelector } from "react-redux";
import { setIsMenuVisible } from "../../../../store/actions";
import styled from "styled-components";
import { selectIsMenuVisible } from "../../../../store/selectors";

const MenuButtonContainer = ({ className }) => {
  const dispatch = useDispatch();
  const isMenuVisible = useSelector(selectIsMenuVisible);
  const onMenuButtonClick = () => dispatch(setIsMenuVisible());

  return (
    <div className={className}>
      <Button
        bold="true"
        nohover="true"
        iconId={isMenuVisible ? "la-times" : "la-bars"}
        onClick={onMenuButtonClick}
      >
        Каталог
      </Button>
    </div>
  );
};

export const MenuButton = styled(MenuButtonContainer)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  width: 15%;
  margin-right: 1%;
`;
