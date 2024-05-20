import React from 'react'
import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'
import { TextFields as TextFieldsIcon } from '@mui/icons-material';
import useDesigner from './hooks/useDesigner';
import FormElementSidebar from './FormElementSidebar';
import PropertiesFormSidebar from './PropertiesFormSIdebar';

function DesignerSidebar() {
  const {selectedElement} =useDesigner() ;
  return <aside className='w-[400px] h-full flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
    {/* <SidebarBtnElement  formElement={FormElements.TextField}  />
     */}
    {!selectedElement && <FormElementSidebar />}
    {selectedElement && <PropertiesFormSidebar />}
    
  </aside>
}

export default DesignerSidebar
