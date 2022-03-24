import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  filterTerm: string;

  constructor() { 
    
    
  }

  ngOnInit() {
    

}


    

userRecords = [{
      "id": 1,
      "toolname": "Zphisher",
      "developername": "xcode",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""

    },
    {
      "id": 2,
      "toolname": "Onex",
      "developername": "lcode",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 3,
      "toolname": "anonphisher",
      "developername": "Sincere@april.biz",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 4,
      "toolname": "toolx",
      "developername": "xcodec",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 5,
      "toolname": "pyphisher",
      "developername": "Sincere@april.biz",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 6,
      "toolname": "dectector",
      "developername": "Sincere@april.biz",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 7,
      "toolname": "boomx",
      "developername": "Sincere@april.biz",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 8,
      "toolname": "infect",
      "developername": "Sincere@april.biz",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 9,
      "toolname": "xkill",
      "developername": "Sincere@april.biz",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    },
    {
      "id": 10,
      "toolname": "Leanne Graham",
      "developername": "Sincere@april.biz",
      "tooldescription":"",
      "contributor":"",
      "disclaimer":"",
      "tooltype":""
    }
  ]
}