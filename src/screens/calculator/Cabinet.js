import React  from 'react';

import {connect} from "react-redux";

import {store} from "../../store/store";
import {getCalcRooms} from "../../actions/kit";
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Kitchen from './cabinet/kitchen';

class Cabinet extends React.Component {

    state = {
        room: [],
    };

    constructor(props){
        super(props);


        let filterroom  = (this.props && this.props.kit&& this.props.kit.room) ? '&filter[name]='+this.props.kit.room : '';
        store.dispatch(getCalcRooms(filterroom));

        // this.svgFunctions= this.svgFunctions.bind(this)
    }

    componentDidMount(){

        // this.getCategories();
        if(!this.props.kit.type){
            // $('#navigate-next').hide();
        }
    }


    //
    // selectItem(e,room){
    //     e.preventDefault();
    //
    //     let cabinetUrl = $(e.target).attr('xlink:href');
    //
    //     let cabinetsList;
    //     if ($(e.target).parent().hasClass('element-item')) {
    //         cabinetsList =  $(e.target).text();
    //     } else {
    //         cabinetsList = $(e.target).parent('a').data('cabinets');
    //     }
    //     $('#'+room+'CabinetTypes .element-item a').removeClass('active');
    //     $('#'+room+'CabinetList').empty();
    //
    //     let selectedItem = $('#'+room+'CabinetTypes .element-item a:contains('+cabinetsList+')');
    //     selectedItem.addClass('active');
    //
    //     //let type = selectedItem.data('aclass');
    //     $('#'+room+'CabinetList').append('<li class="cabinet-item"><a href="#">'+cabinetsList+'</a></li>');
    //     $('#'+room+'CabinetList').addClass('active');
    //
    //
    //
    //     $('#'+room+'').attr('class', 'hover');
    //
    //     let roomClass = $(e.target).data('aclass');
    //     if(!roomClass || roomClass==undefined){
    //         roomClass = $(e.target).parent().data('aclass');
    //     }
    //     $('#'+room+' a').attr('class', '');
    //
    //
    //     $('#'+room+' a path.'+roomClass).parent('a').attr('class', 'ahover clicked');
    //
    //     $('#'+room+'CabinetTypes .element-item a').removeClass('active');
    //     $(e.target).addClass('active');
    //
    //
    //
    //
    //     let type = ($(e.target).data('aclass') !==undefined) ? $(e.target).data('aclass'): $(e.target).parent().data('aclass');
    //
    //     setKitType(type);
    //
    //     return false;
    // };
    //
    //
    //
    // svgFunctions(room){
    //
    //     // let props = this.props;
    //     this.svgDocument = document.getElementById(room).ownerDocument;
    //     this.room_tooltip = this.svgDocument.getElementById(room+'Tooltip');
    //     this.room_tooltip_bg = this.svgDocument.getElementById(room+'Tooltip_bg');
    //
    //
    //
    //
    //     $('#'+room+' path').mouseover(function(){
    //         if(!$('#'+room+' a').hasClass('clicked')){
    //             $('#'+room+'').attr("class", "hover");
    //             $('#'+room+' a').attr('class', '');
    //
    //             $('#'+room+'CabinetTypes .element-item a').removeClass('active');
    //         }
    //
    //     });
    //
    //     $('#'+room+' path').mouseout(function(){
    //         if(!$('#'+room+' a').hasClass('clicked')){
    //             $('#'+room+'').attr("class", "");
    //         }
    //     });
    //
    //     // room functions
    //     // show cabinets list
    //     let obj = this;
    //     $('#'+room+'-room a').click(function (e) {
    //         e.preventDefault();
    //
    //         obj.selectItem(e,room);
    //         return false;
    //     });
    //
    //     $('#'+room+' path').click(function (e) {
    //         e.preventDefault();
    //
    //         obj.selectItem(e,room);
    //         return false;
    //     });
    //
    //     // hide cabinets list
    //     $('.cabinets-section').click(function(e) {
    //         if ($(e.target).closest('#'+room+'CabinetList').length === 0) {
    //
    //             $('#'+room+'CabinetList').removeClass('active');
    //             $('#'+room+'CabinetTypes .element-item a').removeClass('active');
    //             $('#'+room+' a').attr('class', '');
    //             $('#'+room+'').attr('class', '');
    //         }
    //     });
    // }
    //
    //
    //
    // roomShowTooltip(evt, mouseovertext, room)
    // {
    //     this.room_tooltip = this.svgDocument.getElementById(room+'Tooltip');
    //     this.room_tooltip_bg = this.svgDocument.getElementById(room+'Tooltip_bg');
    //     // console.log(room);
    //     // console.log(this.room_tooltip);
    //     this.room_tooltip.firstChild.data = mouseovertext;
    //     this.room_tooltip.setAttributeNS(null,"visibility","visible");
    //     this.room_tooltip.style.opacity = "1";
    //     let length = this.room_tooltip.getComputedTextLength();
    //     this.room_tooltip_bg.setAttributeNS(null,"width",length+20);
    //
    //     // положение элемента
    //     let pos = $('#'+room+'').offset();
    //     let elem_left = pos.left;
    //     let elem_top = pos.top;
    //     // положение курсора внутри элемента
    //     let Xinner = evt.pageX - elem_left;
    //     let Yinner = evt.pageY - elem_top;
    //     this.room_tooltip.setAttributeNS(null,"x", (Xinner - 70));
    //     this.room_tooltip.setAttributeNS(null,"y", (Yinner + 121.5));
    //
    //     this.room_tooltip_bg.setAttributeNS(null,"x", (Xinner - 80));
    //     this.room_tooltip_bg.setAttributeNS(null,"y", (Yinner + 100));
    //
    //     this.room_tooltip_bg.setAttributeNS(null,"visibility","visibile");
    // }
    //
    // roomHideTooltip(evt)
    // {
    //     this.room_tooltip.style.opacity = "0";
    //     this.room_tooltip.setAttributeNS(null,"visibility","hidden");
    //     this.room_tooltip_bg.setAttributeNS(null,"visibility","hidden");
    // }
    //
    // svgItems(room,props){
    //
    //     return room.kitCategories.map(category =>{
    //         return (category.show && category.show===1) ?
    //             <a  href={(category.link !==null) ? category.link : ''} data-aclass ={category.alias} key={category.id} xmlnsXlink="http://www.w3.org/1999/xlink"
    //                 xlinkHref={category.alias} rel="nofollow" data-cabinets={category.name}>
    //                 <path onMouseMove={evt => props.roomShowTooltip(evt, category.name, room.name)}
    //                       onMouseOut={evt => props.roomHideTooltip(evt)}
    //                       className={category.alias} d={category.path}></path>
    //             </a> : false;
    //     });
    // }
    //
    // sidebarItems(room,props){
    //     return room.kitCategories.map(category =>
    //
    //         {
    //             return (category.show && category.show===1) ?
    //                 <li key={category.id} className="element-item"><a href={category.link !==null ? category.link : ''}  onClick={e=>props.selectItem(e,room.name)} data-aclass={category.alias}>{category.name}</a></li>
    //                 : false
    //         }
    //     )
    // }

    render() {

        let roomList = {
            kitchen: Kitchen,
            // bathroom: Bathroom,
            // closet: Closet,
        };

        // let self_state = this.props.kit.calcRooms;
        let self_state = [];

        let Room  = roomList[this.props.kit.room];
        return (
            <ScrollView

            ><Room
                room={this.props.kit.room}
                // roomShowTooltip={this.roomShowTooltip.bind(this)}
                // roomHideTooltip={this.roomHideTooltip.bind(this)}
                // svgFunctions={this.svgFunctions.bind(this)}
                // selectItem={this.selectItem.bind(this)}
                // svgItems={this.svgItems.bind(this)}
                // sidebarItems={this.sidebarItems.bind(this)}
            />
            </ScrollView>
        );

    }
}




// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {

    // Redux Store --> Component
    return {
        kit:state.kitReducer
    };
};


export default connect(mapStateToProps)(Cabinet);
