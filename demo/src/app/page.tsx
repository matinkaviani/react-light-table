"use client"
import "react-light-table/dist/style.css";
import ReactLightTable from "../../../dist/esm/components/ReactLightTable";
export default function Home() {
  const columns = [
    {
      key: "are",
      title: "are",
      sortable: true
    },
    {
      key: "na",
      title: "na",
      sortable: false,
      headClassName: "dsdsd"
    },
    {
      key: "shayad",
      title: "shayad",
      sortable: true,
      headClassName: "dsdsd",
    },
    {
      key: "baba",
      title: "baba",
      sortable: true
    }
  ];
  const data = [
    {
      "are": "matin",
      "na": "kaviani",
      "shayad": "12",
      "baba": "test"
    },
    {
      "are": "reza",
      "na": "darani",
      "shayad": "8",
      "baba": "tset"
    },
    {
      "are": "John",
      "na": "Smith",
      "shayad": "1000",
      "baba": "lorem"
    },
  ]

  return (
    <div>
      <ReactLightTable
        columns={columns}
        data={data}
        numberRows
        initSort={{ key: "shayad", mode: "desc" }}
      />
    </div>
  )
}
