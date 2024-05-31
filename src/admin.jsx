import { RangesDirective, SheetsDirective, SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import "./css/admin.css"
export default function Admin(){
    return(
        <div>
           <SpreadsheetComponent>
              <SheetsDirective>
                <SheetsDirective>
                    <RangesDirective>
                        <RangesDirective></RangesDirective>
                    </RangesDirective>
                </SheetsDirective>
              </SheetsDirective>
           </SpreadsheetComponent>
        </div>
    )

}