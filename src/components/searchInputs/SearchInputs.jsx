import React from 'react'
import { Flex, Select, Input } from "antd"

const { Search } = Input;

export const SearchInputs = ({setName, setCategory, setPrice}) => {
  return <>
  <Flex gap={"middle"} justify={"center"} align={"center"} style={{width:"100%"}}>
  <Search
            className="w-50"
            placeholder="Buscar por nombre"
            style={{width:"25vw"}}
            onSearch={(e)=> setName(e)}
          />
            <Select
            className="ms-3 w-50"
            onChange={(e)=> setPrice(e)}
            defaultValue="Buscar por precio"
            options={[
              {
                value: "",
                label: "Todo",
              },
              {
                value: "asc",
                label: "Ascendente",
              },
              {
                value: "desc",
                label: "Descendente",
              },
            ]}
          />

  <Select
            className="ms-3 w-50"
            onChange={(e)=> setCategory(e)}
            defaultValue="Buscar por categoria"
            options={[
              {
                value: "",
                label: "Todas",
              },
              {
                value: "Test1",
                label: "Test1",
              },
              {
                value: "Test2",
                label: "Test2",
              },
            ]}
          />
  </Flex>
  </>
}
