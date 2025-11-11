'use client'

import { GraphsProps } from "@/app/interfaces/report";



const Graphs = ({data}: GraphsProps) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    const orange = "rgba(255,117,29,1)";
    const light = "rgba(255,218,192,1)";
    const gridColor = "rgba(245, 246, 251, 1)";
    
  

  return (
      <div className="relative z-50 tab:w-[635px] desk:w-[758px] mx-auto flex items-end  gap-6 p-6 bg-white rounded-lg">
      <div
        className="absolute left-0 right-0 z-10"
        style={{
        
          top: '40px',          
          bottom: '80px',       
          backgroundImage: `
            repeating-linear-gradient(
              to top,
              ${gridColor},
              ${gridColor} 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        }}
      />
      {data.map((item, i) => (
        <div key={item.label} className="relative z-50 flex flex-col items-center">
          <p className="text-xs text-text_color mb-2">{`${item.value} UAH`}</p>
            <div
            className="w-9 rounded-tl-[10px] rounded-tr-[10px] "
                 style={{
              height: `${(item.value / maxValue) * 200}px`,
              backgroundColor: i % 3 === 0 ? orange : light,
            }}
            title={`${item.value} UAH`}
          ></div>
          <p className="text-xs text-text_color mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default Graphs;


// 'use client'

// import { useEffect, useRef, useState } from "react";

// const data = [
//   { label: "Pork", value: 1000 },
//   { label: "Beef", value: 1000 },
//   { label: "Chicken", value: 600 },
//   { label: "Fish", value: 800 },
//   { label: "Panini", value: 220 },
//   { label: "Coffee", value: 350 },
//   { label: "Spaghetti", value: 230 },
//   { label: "Chocolate", value: 200 },
//   { label: "Olives", value: 300 },
//   { label: "Greens", value: 300 },
//   { label: "Greens", value: 300 },
//   { label: "Greens", value: 300 },
// ];

// const Graphs = () => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   const maxValue = Math.max(...data.map((d) => d.value));
//   const orange = "rgba(255,117,29,1)";
//   const light = "rgba(255,218,192,1)";
//   const gridColor = "rgba(245, 246, 251, 1)";

//   useEffect(() => {
//     const updateWidth = () => {
//       if (containerRef.current) {
//         setContainerWidth(containerRef.current.getBoundingClientRect().width);
//       }
//     };
//     updateWidth();
//     window.addEventListener("resize", updateWidth);
//     return () => window.removeEventListener("resize", updateWidth);
//   }, []);

//   const total = data.length;

//   // Задаємо відступ між стовпчиками (динамічний gap)
//   // Максимальний gap 12px, але зменшуємо якщо дуже багато стовпчиків
//   const maxGap = 12;
//   const minGap = 4;
//   // Проста формула для динамічного gap (наприклад, чим більше стовпчиків - тим менший gap)
//   const gap =
//     total < 10
//       ? maxGap
//       : Math.max(minGap, maxGap - (total - 10) * 1.5); // зменшуємо gap, але не менше minGap

//   // Ширина одного стовпчика у відсотках із урахуванням gap
//   // Формула: загальна ширина для gap = gap * (total -1)
//   // залишок — на стовпчики, ділимо на total і задаємо max 36px
//   const totalGapWidthPx = gap * (total - 1);
//   const availableWidthPx = containerWidth - totalGapWidthPx;
//   let barWidthPx = availableWidthPx / total;
//   if (barWidthPx > 36) barWidthPx = 36;

//   return (
//     <div
//       ref={containerRef}
//       className="relative z-50 tab:w-[635px] desk:w-[758px] mx-auto flex items-end p-6 bg-white rounded-lg overflow-hidden"
//       style={{
//         gap: `${gap}px`,
//       }}
//     >
//       {/* Сітка */}
//       <div
//         className="absolute left-0 right-0 z-10"
//         style={{
//           top: "40px",
//           bottom: "80px",
//           backgroundImage: `
//             repeating-linear-gradient(
//               to top,
//               ${gridColor},
//               ${gridColor} 1px,
//               transparent 1px,
//               transparent 40px
//             )
//           `,
//         }}
//       />

//       {data.map((item, i) => (
//         <div
//           key={item.label + i}
//           className="relative z-50 flex flex-col items-center"
//           style={{
//             flex: `0 0 ${barWidthPx}px`,
//             maxWidth: "36px",
//             minWidth: "8px", // щоб не було занадто вузько
//           }}
//         >
//           <p className="text-xs text-text_color mb-2">{`${item.value} UAH`}</p>
//           <div
//             className="w-full rounded-tl-[10px] rounded-tr-[10px]"
//             style={{
//               height: `${(item.value / maxValue) * 200}px`,
//               backgroundColor: i % 3 === 0 ? orange : light,
//               transition: "height 0.3s ease",
//             }}
//             title={`${item.value} UAH`}
//           ></div>
//           <p className="text-xs text-text_color mt-2">{item.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Graphs;
