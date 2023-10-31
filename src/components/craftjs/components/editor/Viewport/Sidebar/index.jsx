import { useEditor } from '@craftjs/core';

import { useState } from 'react';
import styled from '@emotion/styled';

import { SidebarItem } from './SidebarItem';

import CustomizeIcon from '@/images/icons/customize.svg';
import LayerIcon from '@/images/icons/layers.svg';
import { Toolbar } from '../../Toolbar';
// import { Layers } from '@craftjs/layers';

// export const SidebarDiv = styled.div`
//   width: 280px;
//   opacity: ${(props) => (props.enabled ? 1 : 0)};
//   background: #fff;
//   margin-right: ${(props) => (props.enabled ? 0 : -280)}px;
// `;


export const SidebarDiv = styled.div`
  width: 280px;
  opacity: 1;
  background: #fff;
  margin-right: 0px;
`;


export const Sidebar = () => {
  const [layersVisible, setLayerVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <SidebarDiv enabled={enabled} className="sidebar transition bg-white">
      <div className="flex flex-col h-full">
        <SidebarItem
          icon={CustomizeIcon}
          title="Customize"
          height={!layersVisible ? 'full' : '55%'}
          visible={toolbarVisible}
          onChange={(val) => setToolbarVisible(val)}
        >
          <Toolbar />
        </SidebarItem>
        <SidebarItem
          icon={LayerIcon}
          title="Layers"
          height={!toolbarVisible ? 'full' : '45%'}
          visible={layersVisible}
          onChange={(val) => setLayerVisible(val)}
        >
          {/* <div className="">
            <Layers expandRootOnLoad={true} />
          </div> */}
        </SidebarItem>
        
      </div>
   </SidebarDiv>
  );
};
