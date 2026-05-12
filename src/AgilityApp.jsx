// První automatická verze z Figmy - ROZBITÉ!
const imgImage6 = "https://www.figma.com/api/mcp/asset/faf84bb6-fe2d-491b-bc9d-f834fae7bb20";
const imgImage2 = "https://www.figma.com/api/mcp/asset/f3ed2b4d-1360-4b2c-87f5-b912654d6ce6";
const imgIcon24Profile = "https://www.figma.com/api/mcp/asset/c7b14b4c-c14d-479c-80df-4ff17bdf472c";
const imgIcon24Menu = "https://www.figma.com/api/mcp/asset/2bd9332c-df87-4860-bd24-5068becf6f0f";

export default function AgiApp() {
  return (
    <div className="bg-[var(--colors/background/background,#fffcfa)] relative size-full">
      <div className="-translate-x-1/2 absolute bg-white drop-shadow-[0px_0px_4px_rgba(98,46,0,0.12)] flex flex-col h-[56px] items-center justify-center left-1/2 top-0 w-[375px]">
        <div className="flex gap-[16px] items-center px-[24px] relative shrink-0 w-full">
          <div className="flex h-[40px] items-center relative shrink-0 w-[253px]">
            <div className="h-[24px] relative shrink-0 w-[78.6px]">
              <div className="absolute inset-[0_65.65%_-8.33%_-2.54%]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[211.76%] left-[-45.95%] max-w-none top-[-50%] w-[194.59%]" src={imgImage6} />
                </div>
              </div>
              <div className="absolute flex flex-col font-bold inset-[9.11%_-67.81%_7.55%_41.86%] justify-center text-[14px]">
                <p className="leading-[20px]">Agility planning</p>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 size-[24px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon24Profile} />
          </div>
          <div className="relative shrink-0 size-[24px]">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIcon24Menu} />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center left-0 pt-[32px] top-[56px]">
        <div className="flex flex-col items-center px-[16px] relative shrink-0 w-[375px]">
          <div className="flex flex-col gap-[24px] items-end relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full">
            <div className="bg-white border-2 flex flex-col h-[309px] items-end justify-end px-[12px] py-[32px] relative rounded-[16px] shrink-0 w-full">
              <div className="flex flex-col gap-[24px] items-center relative shrink-0 w-full">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid relative shrink-0">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[132px]">
                    <img alt="" src={imgImage2} />
                  </div>
                </div>
                <div className="flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-full">
                  <div className="flex flex-col items-center justify-center relative shrink-0 w-full">
                    <div className="flex flex-col font-bold justify-center text-[16px] text-center">
                      <p>Kaii</p>
                      <p className="text-[14px]">Border collie<br/>Category A2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
