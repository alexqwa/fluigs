import { prisma } from '@/lib/prisma'

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        email: 'gerencia.gynbal@atacadaodiaadia.com.br',
        name: 'Balneário',
      },
      {
        email: 'gerencia.rfo1@atacadaodiaadia.com.br',
        name: 'Riacho Fundo 01',
      },
      {
        email: 'gerencia.sad@atacadaodiaadia.com.br',
        name: 'Santo Antônio',
      },
      {
        email: 'gerencia.rde@atacadaodiaadia.com.br',
        name: 'Recanto Das Emas',
      },
      {
        email: 'gerencia.gynnov@atacadaodiaadia.com.br',
        name: 'César Lattes',
      },
      {
        email: 'gerencia.eptg@atacadaodiaadia.com.br',
        name: 'Eptg',
      },
      {
        email: 'gerencia.gama@atacadaodiaadia.com.br',
        name: 'Gama',
      },
      {
        email: 'gerencia.gon@atacadaodiaadia.com.br',
        name: 'Goianésia',
      },
      {
        email: 'gerencia.qnn30@atacadaodiaadia.com.br',
        name: 'Ceilândia Sul',
      },
      {
        email: 'gerencia.tag@atacadaodiaadia.com.br',
        name: 'Taguatinga',
      },
      {
        email: 'gerencia.fsa@atacadaodiaadia.com.br',
        name: 'Formosa',
      },
      {
        email: 'gerencia.aps@atacadaodiaadia.com.br',
        name: 'Aparecida GO',
      },
      {
        email: 'gerencia.smdb@atacadaodiaadia.com.br',
        name: 'Jardim Botânico',
      },
      {
        email: 'gerencia.mda@atacadaodiaadia.com.br',
        name: "M. D'armas",
      },
      {
        email: 'gerencia.agl@atacadaodiaadia.com.br',
        name: 'Águas Lindas',
      },
      {
        email: 'gerencia.sia@atacadaodiaadia.com.br',
        name: 'Sia',
      },
      {
        email: 'gerencia.br070@atacadaodiaadia.com.br',
        name: 'Ceilândia BR 070',
      },
      {
        email: 'gerencia.guara@atacadaodiaadia.com.br',
        name: 'Guará',
      },
      {
        email: 'gerencia.vcp@atacadaodiaadia.com.br',
        name: 'Vicente Rua 12',
      },
      {
        email: 'gerencia.qnm11@atacadaodiaadia.com.br',
        name: 'Ceilândia Centro',
      },
      {
        email: 'gerencia.cdn@atacadaodiaadia.com.br',
        name: 'Caldas Novas',
      },
      {
        email: 'gerencia.rvd@atacadaodiaadia.com.br',
        name: 'Rio Verde',
      },
      {
        email: 'gerencia.smb2@atacadaodiaadia.com.br',
        name: 'Furnas',
      },
      {
        email: 'gerencia.novogama@atacadaodiaadia.com.br',
        name: 'Novo Gama',
      },
      {
        email: 'gerencia.pdf@atacadaodiaadia.com.br',
        name: 'Planaltina DF',
      },
      {
        email: 'gerencia.agc@atacadaodiaadia.com.br',
        name: 'Águas Claras',
      },
      {
        email: 'gerencia.itb@atacadaodiaadia.com.br',
        name: 'Itumbiara',
      },
      {
        email: 'gerencia.vcp2@atacadaodiaadia.com.br',
        name: 'Vicente Rua 04',
      },
      {
        email: 'gerencia.sob@atacadaodiaadia.com.br',
        name: 'Sobradinho',
      },
      {
        email: 'gerencia.pgo@atacadaodiaadia.com.br',
        name: 'Planaltina GO',
      },
      {
        email: 'gerencia.smb@atacadaodiaadia.com.br',
        name: 'Samambaia',
      },
      {
        email: 'delivered@resend.dev',
        name: 'Luís Eduardo Magalhães',
      },
      {
        email: 'gerencia.grp0@atacadaodiaadia.com.br',
        name: 'Gurupi',
      },
      {
        email: 'gerencia.luz2@atacadaodiaadia.com.br',
        name: 'Luziânia 2',
      },
      {
        name: 'Luziânia',
        email: 'gerencia.luz@atacadaodiaadia.com.br',
      },
    ],
  })
}

seed().then(() => {
  console.log('✅ Seed executado com ID dinâmico')
  prisma.$disconnect()
})
