/**
 * Created by mobiletek on 17/8/31.
 */

Ext.define('ExtTest.test1.testDetailsGrid',{
    extend:'Ext.grid.GridPanel',
    id:'testDetailsGrid',
    store:'testDetailsGridStore',
    renderTo:'testDetailGridRender',
    layout:'fit',
    columns:[{
        text:'Test Name',
        dataIndex:'testName'
    },{
        text:'Id',
        dataIndex:'testId'
    },{
        text:'Department',
        dataIndex:'department'
    }]
});
