import React, { useState, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { getFiles, getFolders } from '../redux/action/filefolderCreator.js';
import { Dashboard } from './Dashboard'

import CreateFile from './Pages/CreateFile';
import CreateFolder from './Pages/CreateFolder';
import FileComponent from './Pages/FileComponent';
import FolderComponent from './Pages/FolderComponent';
import { Navigation } from './SideBar/Navigation';
import SubBar from './SubBar'




function Home() {
  const dispatch = useDispatch();
  const [showSubBar, setSubBar] = useState(true);
  const { pathname } = useLocation();
  const [isCreateFolderOpt, setCreateFolderOpt] = useState(false);
  const [isCreateFileOpt, setCreateFileOpt] = useState(false);
  const { isLoading } = useSelector((state: any) => ({
    isLoading: state.filefolder.isLoading
  }), shallowEqual)

  useEffect(() => {
    if (pathname.includes("/file/")) {
      setSubBar(false);
    }
    else{
      setSubBar(true);
    }
  }, [pathname])



  useEffect(() => {
    if (isLoading) {
      dispatch(getFolders());
      dispatch(getFiles());
    }

  }, [isLoading, dispatch])



  return (
    <div className='container align-items-center m-auto '>


      <div className='flex  justify-content-center m-auto '>

        {
          isCreateFolderOpt &&
          (<CreateFolder setShowModal={setCreateFolderOpt} showModal={isCreateFolderOpt} />)
        }

        {
          isCreateFileOpt &&
          (<CreateFile setShowModal2={setCreateFileOpt} showModal2={isCreateFileOpt} />)
        }

        {showSubBar && (
          <SubBar setCreateFolderOpt={setCreateFolderOpt} setCreateFileOpt={setCreateFileOpt} />
        )}

        <div className='row'>
          <div className='col-3'><Navigation /></div>


          <div className='col-9'>






            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="folder/:folderId" element={<FolderComponent />} />
              <Route path="file/:fileId" element={<FileComponent />} />
            </Routes></div>
        </div>
      </div></div>
  )
}

export default Home