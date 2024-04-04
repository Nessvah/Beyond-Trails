import { useEffect } from "react";
import Highcharts from "highcharts";

function ConsultarDesempenho() {
  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        type: "column",
        backgroundColor: "white"
      },
      title: {
        text: "Número de Visitantes com Promoção por Mês",
        style: {
          fontSize: "2rem"
        }
      },
      xAxis: {
        categories: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro"
        ],
        labels: {
          style: {
            fontSize: "1.5rem"
          }
        }
      },
      yAxis: {
        title: {
          text: "Número de Visitantes",
          style: {
            fontSize: "2rem"
          }
        },
        labels: {
          style: {
            fontSize: "1.5rem"
          },
          format: "{value}"
        }
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          return `<div style="font-size: 2rem; color: ${this.point.color}; text-align: center; display: flex; justify-content: center; align-items: center; height: 100%;">${this.x}: ${this.y} (${this.series.name})</div>`;
        }
      },
      plotOptions: {
        column: {
          dataLabels: {
            style: {
              fontSize: "2rem"
            }
          }
        }
      },
      legend: {
        itemStyle: {
          fontSize: "1.8rem"
        }
      },
      series: [
        {
          name: "Promoção A",
          data: [100, 150, 200, 180, 220, 300, 250, 280, 320, 270, 240, 200],
          color: "#1747AF",
          dataLabels: {
            style: {
              fontSize: "2.5rem"
            }
          }
        },
        {
          name: "Promoção B",
          data: [80, 120, 150, 140, 180, 250, 210, 240, 260, 220, 200, 160],
          color: "var(--bs-secondary)",
          dataLabels: {
            style: {
              fontSize: "2.5rem"
            }
          }
        }
      ]
    });
  }, []);

  return (
    <div
      id='container'
      style={{
        width: "80%",
        height: "70vh",
        paddingBottom: "15rem",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}></div>
  );
}

export default ConsultarDesempenho;
