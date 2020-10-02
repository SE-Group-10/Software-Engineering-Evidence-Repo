import React from "react";
import "./SearchFilters.css";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  SubMenu,
  MenuItem,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

class SearchFilters extends React.Component {
  render() {
    return (
      <ProSidebar>
        <SidebarHeader>
          <Menu iconShape="square">
            <SubMenu title="Search Filters:">
              <MenuItem>Component 1</MenuItem>
              <SubMenu title="Sub Component 1">
                {/* you can have more nested submenus ... */}
              </SubMenu>
            </SubMenu>
          </Menu>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <SubMenu title="Sort By:">
              <MenuItem>Component 1</MenuItem>
              <SubMenu title="Sub Component 1">
                {/* you can have more nested submenus ... */}
              </SubMenu>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    );
  }
}

export default SearchFilters;
