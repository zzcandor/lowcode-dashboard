import gaugeConfig from './gauge'

export {
    gaugeConfig,
}

export default type => ({
    type: 'chart',
    settings: {
        type,
    },
    datacon: {
        type: 'raw',
        connectId: '',
        data: {
            columns: ['日期', '访问用户'],
            rows: [
                { 日期: '1月1日', 访问用户: 1523 },
                { 日期: '1月2日', 访问用户: 1223 },
                { 日期: '1月3日', 访问用户: 2123 },
                { 日期: '1月4日', 访问用户: 4123 },
                { 日期: '1月5日', 访问用户: 3123 },
                { 日期: '1月6日', 访问用户: 7123 },
            ],
        },
        getUrl: '',
        interval: 2,
    },
    generated: {
        columns: ['日期', '访问用户'],
        rows: [
            { 日期: '1月1日', 访问用户: 1523 },
            { 日期: '1月2日', 访问用户: 1223 },
            { 日期: '1月3日', 访问用户: 2123 },
            { 日期: '1月4日', 访问用户: 4123 },
            { 日期: '1月5日', 访问用户: 3123 },
            { 日期: '1月6日', 访问用户: 7123 },
        ],
    },
})
