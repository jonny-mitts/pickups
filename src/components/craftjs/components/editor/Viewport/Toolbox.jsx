import { Element, useEditor } from '@craftjs/core';
import { Tooltip } from '@mui/material';
import styled from '@emotion/styled';

import ButtonSvg from '@/images/icons/toolbox/button.svg';
import SquareSvg from '@/images/icons/toolbox/rectangle.svg';
import TypeSvg from '@/images/icons/toolbox/text.svg';
import YoutubeSvg from '@/images/icons/toolbox/video-line.svg';
import Icon from '@mdi/react';
import { mdiPageLayoutHeader } from '@mdi/js';
import { Button } from '@/components/craftjs/components/selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';
import Image from 'next/image';
import { Header } from '@/components/Header';

const ToolboxDiv = styled.div`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.a`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              {/* <SquareSvg /> */}
              <Image src={SquareSvg} />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              {/* <TypeSvg /> */}
              <Image src={TypeSvg} />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              {/* <ButtonSvg /> */}
              <Image src={ButtonSvg} />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              {/* <YoutubeSvg /> */}
              <Image src={YoutubeSvg} />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Header />)}>
          <Tooltip title="Navigation Header" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              {/* <YoutubeSvg /> */}
              <Icon path={mdiPageLayoutHeader} size={1} />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
