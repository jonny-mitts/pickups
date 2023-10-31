'use client';;
import GjsEditor, {
  AssetsProvider,
  Canvas,
  ModalProvider,
} from '@grapesjs/react';

import { MAIN_BORDER_COLOR, EDITOR_BG_COLOR } from '@/components/ContentComponents/common.js';
import CustomModal from '@/components/ContentComponents/CustomModal';
import CustomAssetManager from '@/components/ContentComponents/CustomAssetManager';
import '@/components/ContentComponents/style.css';
import Topbar from '@/components/ContentComponents/Topbar';
import { Header } from '@/components/Header';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import pluginCKEditor from 'grapesjs-plugin-ckeditor';
import Showdown from 'showdown';
import { Footer } from '@/components/Footer';
import RightSidebar from '@/components/ContentComponents/RightSidebar';
import BaseReactComponent from '@/components/GrapeJSComponents/base-react-component';
import ReactComponents from '@/components/GrapeJSComponents/react-component';
import Basics from 'grapesjs-blocks-basic';
import FlexBox from 'grapesjs-blocks-flexbox';
import tailwindCss from '@/styles/tailwind.css';

// canvas:{
//   styles:tailwindCss
// },

// import pluginHeader from 'grapesjs-plugin-header';

const converter = new Showdown.Converter()

const Content = (props) => {
  const [profile, setProfile] = useState(null);
  const [editorOptions, setEditorOptions] = useState(null);
  const [editor, setEditor] = useState(null);
  const [contentId, setContentId] = useState(null);

  
  console.log("🚀 ~ file: page.jsx:40 ~ Content ~ tailwindCss:",  tailwindCss)
  useEffect(() => {
    if (profile) {
      const { id: user_id, account_id } = profile
      const getEditorOptions = () => {
        return {
          height: '100vh',
          storageManager: false,
          undoManager: { trackSelection: false },
          selectorManager: { componentFirst: true },
          canvas:{
            styles:[
              "http://localhost:3000/_next/static/css/app/layout.css?v=1698407721302",
              "https://fonts.googleapis.com/css?family=Lexend"
            ]
          },
          
          projectData: {
            assets: [
              'https://via.placeholder.com/350x250/78c5d6/fff',
              'https://via.placeholder.com/350x250/459ba8/fff',
              'https://via.placeholder.com/350x250/79c267/fff',
              'https://via.placeholder.com/350x250/c5d647/fff',
              'https://via.placeholder.com/350x250/f28c33/fff',
            ],
            pages: [
              {
                name: 'Home page',
                component: `<h1>GrapesJS React Custom UI</h1>`,
              },
            ],
          },
        }
      }
      const eOptions = getEditorOptions()
      setEditorOptions(eOptions)
    }
  }, [profile])

  const script = function() {
    console.log('the element', this);
  };

  const onEditor = (editr) => {
    const blockManager = editr.Blocks;
    editr.setComponents('<div class="cls">New component</div>')

    


    blockManager.add('h1-block', {
      label: 'Heading',
      content: '<h1>Put your title here</h1>',
      category: 'Basic',
      media:`<svg viewBox="0 0 24 24">
        <path style="fill: white;" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M13,8H15.31L15.63,5H17.63L17.31,8H19.31L19.63,5H21.63L21.31,8H23V10H21.1L20.9,12H23V14H20.69L20.37,17H18.37L18.69,14H16.69L16.37,17H14.37L14.69,14H13V12H14.9L15.1,10H13V8M17.1,10L16.9,12H18.9L19.1,10H17.1Z" />
      </svg>`,
      attributes: {
        title: 'Insert h1 block',
      },
    })

    
    setEditor(editr)
  }

  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect('/login')
    },
  })

  useEffect(() => {
    if (window?.location.pathname) {
      const getContent = async () => {
        const { account_id } = profile
        const res = await fetch(
          `/api/${window.location.pathname}?${new URLSearchParams({
            account_id,
          })}`
        )

        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }

        const { data } = await res.json()
        const { content, contentId, styles } = data;
        
        if (content) {
          setContentId(contentId);
          editor.setComponents(`<style>${styles}</style>`);
          editor.setComponents(
            `<div class="cls">${content}</div>`
          )
        } else {
          editor.setComponents(
            `<div class="cls">Welcome to Pickups PageBuilder!</div>`
          )
        }
      }

      if (window && window.location && profile && editor) {
        getContent()
      }
    }
  }, [profile, editor])

  useEffect(() => {
    const getProfile = async () => {
      const res = await fetch(
        '/api/profile?' + new URLSearchParams({ email: session?.user.email })
      )

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const { data } = await res.json()

      setProfile(data?.[0])
    }

    if (session?.user?.email) {
      getProfile()
    }
  }, [session, session?.user])

  const localProps = {
    session,
    profile,
    contentId,
    setContentId,
  }

  return (
    // @ts-ignore
    <>
      {editorOptions && (
          <GjsEditor
            className="gjs-custom-editor bg-slate-900 text-white"
            grapesjs="https://unpkg.com/grapesjs"
            grapesjsCss="https://unpkg.com/grapesjs/dist/css/grapes.min.css"
            options={editorOptions} 
            
            plugins={[
              FlexBox,
              BaseReactComponent,
              ReactComponents,
              pluginCKEditor,
              Basics
            ]}
            onEditor={onEditor}
          >
            <div className={`flex h-full border-t`}>
              <div className={`gjs-column-m mx-auto flex max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8`}>
                <Topbar
                  className="min-h-[48px]"
                  {...localProps}
                />
                <Header />
                <Canvas className={`gjs-custom-editor-canvas  ${EDITOR_BG_COLOR}`} />
                <Footer />
              </div>
              <RightSidebar
                className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`}
                {...localProps}
              />
            </div>
            <ModalProvider>
              {({ open, title, content, close }) => (
                <CustomModal
                  open={open}
                  title={title}
                  children={content}
                  close={close}
                />
              )}
            </ModalProvider>
            <AssetsProvider>
              {({ assets, select, close, Container }) => (
                <Container>
                  <CustomAssetManager
                    assets={assets}
                    select={select}
                    close={close}
                  />
                </Container>
              )}
            </AssetsProvider>
          </GjsEditor>

      )}
    </>
  )
}

export default Content
