'use client';
// components/AddLocation.jsx
import MapComponent from './MapComponent1';
import { useState } from 'react';

function AddLocation() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSaveLocation = () => {
    if (selectedLocation) {
      // console.log('Saved Location:', selectedLocation);
      // يمكنك هنا إرسال البيانات إلى الخادم أو تخزينها في حالة أخرى
    } else {
      // console.log('No location selected');
    }
  };

  return (
    <div>
      <div className="Frame34258 w-72 h-96 p-2.5 bg-white rounded-2xl shadow flex-col justify-between items-center inline-flex">
  <div className="Frame34261 self-stretch h-96 flex-col justify-start items-start gap-2 flex">
    <div className="Frame34262 self-stretch bg-white justify-between items-center inline-flex">
      <div className="Frame34291 flex-col justify-center items-start gap-2 inline-flex">
        <div className="SelectThBranch text-black text-base font-semibold font-['K2D'] leading-tight">Select th branch</div>
        <div className="Description text-neutral-400 text-xs font-medium font-['K2D'] leading-none">Description</div>
      </div>
      <div className="Frame222 w-10 h-10 relative">
        <div className="Frame220 p-0.5 left-[-3px] top-[-3px] absolute rounded-full justify-start items-start gap-2.5 inline-flex">
          <div className="VuesaxBulkCloseCircle w-10 h-10 relative">
            <div className="CloseCircle w-10 h-10 left-0 top-0 absolute">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="Frame34282 self-stretch grow shrink basis-0 flex-col justify-start items-start gap-3 flex">
      <div className="Frame34281 self-stretch grow shrink basis-0 rounded-lg flex-col justify-start items-start gap-2 flex">
        <div className="Frame34266 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34283 h-0.5 relative bg-stone-100" />
        <div className="Frame34267 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34284 h-0.5 relative bg-stone-100" />
        <div className="Frame34268 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34285 h-0.5 relative bg-stone-100" />
        <div className="Frame34269 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34286 h-0.5 relative bg-stone-100" />
        <div className="Frame34270 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34287 h-0.5 relative bg-stone-100" />
        <div className="Frame34271 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34288 h-0.5 relative bg-stone-100" />
        <div className="Frame34272 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34289 h-0.5 relative bg-stone-100" />
        <div className="Frame34273 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
        <div className="Frame34290 h-0.5 relative bg-stone-100" />
        <div className="Frame34274 self-stretch h-28 px-2 pt-1.5 pb-3 rounded-lg flex-col justify-start items-start gap-2.5 flex">
          <div className="Frame34280 justify-center items-center gap-2.5 inline-flex">
            <div className="RiyadhBranch text-black text-base font-semibold font-['K2D'] leading-snug">Riyadh branch</div>
          </div>
          <div className="Frame34279 self-stretch h-16 flex-col justify-start items-start gap-0.5 flex">
            <div className="Frame34267 self-stretch h-8 py-1.5 rounded-lg flex-col justify-between items-start flex">
              <div className="Frame34269 self-stretch justify-between items-center inline-flex">
                <div className="Frame34268 justify-start items-center gap-1.5 flex">
                  <div className="VuesaxLinearClock w-4 h-4 relative">
                    <div className="Clock w-4 h-4 left-0 top-0 absolute">
                    </div>
                  </div>
                  <div className="OpenUntil100 text-Colors-Green text-sm font-normal font-['K2D'] leading-snug">Open until 1:00</div>
                </div>
                <div className="VuesaxBulkArrowCircleDown w-5 h-5 relative">
                  <div className="ArrowCircleDown w-5 h-5 left-0 top-0 absolute">
                  </div>
                </div>
              </div>
            </div>
            <div className="Frame34266 self-stretch justify-start items-start gap-1.5 inline-flex">
              <div className="VuesaxLinearLocation w-4 h-4 relative">
                <div className="Location w-4 h-4 left-0 top-0 absolute">
                </div>
              </div>
              <div className="KingFahdRoadAlAqiqDistrictRiyadh13515SaudiArabia grow shrink basis-0 h-8 text-neutral-500 text-sm font-normal font-['K2D'] leading-tight">King Fahd Road, Al Aqiq District, Riyadh 13515, Saudi Arabia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="Frame195 self-stretch justify-start items-center gap-2 inline-flex">
    <div className="Frame191 grow shrink basis-0 h-11 px-32 py-4 bg-cyan-700 rounded-lg justify-center items-center gap-2.5 flex">
      <div className="Confirm text-white text-base font-semibold font-['K2D'] leading-tight">Confirm</div>
    </div>
  </div>
</div>
    </div>
  );
}

export default AddLocation;

