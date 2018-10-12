class test
{
    constructor()
    {
        this.routes = [
            { method: 'get', url: '/api/test' }
        ];

        this.exec = this.exec.bind(this);
    }

    init()
    {
        return Promise.resolve();
    }

    exec(req, res)
    {
        res.json({
            result: 1,
            message: 'data get',
            data: [
                { a: 1, b: 2 },
                { a: 2, b: 3 }
            ]
        });
    }
}

module.exports = test;