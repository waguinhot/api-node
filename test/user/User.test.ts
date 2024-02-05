

test('deve criar o usuario corretamente' , async () =>{

    let user = {
        name: 'example name',
        email: 'teste@email.com',
        password: 'secret123'
    }

    const jwt = await pegarJWT();

    const resCreate = await fetch('http://localhost:4500/api/user/create' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt
        },
        body: JSON.stringify(user)
    });
     const nowOutput = await resCreate.json();

    expect(nowOutput.data.id).toBeDefined();

    await fetch('http://localhost:4500/api/user/delete/' + nowOutput.data.id , {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    })
  

})




test('deve deletear o usuario corretamente e nao retornar' , async () =>{

    let user = {
        name: 'example name',
        email: 'teste@email.com',
        password: 'secret123'
    }

    const jwt = await pegarJWT();


    const resCreate = await fetch('http://localhost:4500/api/user/create' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + jwt

        },
        body: JSON.stringify(user)
    })

    const outputResCreate = await resCreate.json();


     expect(outputResCreate.data.id).toBeDefined();

  
    await fetch('http://localhost:4500/api/user/delete/' + outputResCreate.data.id , {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    })

    const verifyExclude = await fetch('http://localhost:4500/user/'+outputResCreate.data.id ,  {
        headers: {
            Authorization: 'Bearer ' + jwt
        }
    });

    expect(verifyExclude.status).toBe(404);

})


test('nao deve achar o usuario pelo id por nao existir' , async () =>{

        const jwt = await pegarJWT();
        
        const dataFetch = await fetch('http://localhost:4500/user/5877',  {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        });
            expect(dataFetch.status).toBe(404);


    
    })

    async function pegarJWT(){
        const response = await fetch('http://localhost:4500/api/login' , {
            method: 'POST',
            headers: {     
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "example@email.com",
                password: "secret123"
            })
        })

        const output = await response.json();
        const jwt = await output.data.token;
        return jwt;
    }