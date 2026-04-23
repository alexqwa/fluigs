import { prisma } from '@/lib/prisma'

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        email: 'gerencia.gynbal@atacadaodiaadia.com.br',
        name: 'Balneário',
        branch: 0,
      },
      {
        email: 'gerencia.rfo1@atacadaodiaadia.com.br',
        name: 'Riacho Fundo 01',
        branch: 0,
      },
      {
        email: 'gerencia.sad@atacadaodiaadia.com.br',
        name: 'Santo Antônio do Descoberto',
        branch: 0,
      },
      {
        email: 'gerencia.rde@atacadaodiaadia.com.br',
        name: 'Recanto Das Emas',
        branch: 0,
      },
      {
        email: 'gerencia.gynnov@atacadaodiaadia.com.br',
        name: 'César Lattes',
        branch: 0,
      },
      {
        email: 'gerencia.eptg@atacadaodiaadia.com.br',
        name: 'Eptg',
        branch: 0,
      },
      {
        email: 'gerencia.gama@atacadaodiaadia.com.br',
        name: 'Gama',
        branch: 0,
      },
      {
        email: 'gerencia.gon@atacadaodiaadia.com.br',
        name: 'Goianésia',
        branch: 0,
      },
      {
        email: 'gerencia.qnn30@atacadaodiaadia.com.br',
        name: 'Ceilândia Sul',
        branch: 0,
      },
      {
        email: 'gerencia.tag@atacadaodiaadia.com.br',
        name: 'Taguatinga',
        branch: 0,
      },
      {
        email: 'gerencia.fsa@atacadaodiaadia.com.br',
        name: 'Formosa',
        branch: 0,
      },
      {
        email: 'gerencia.aps@atacadaodiaadia.com.br',
        name: 'Aparecida GO',
        branch: 0,
      },
      {
        email: 'gerencia.smdb@atacadaodiaadia.com.br',
        name: 'Jardim Botânico',
        branch: 0,
      },
      {
        email: 'gerencia.mda@atacadaodiaadia.com.br',
        name: "Mestre D'armas",
        branch: 0,
      },
      {
        email: 'gerencia.agl@atacadaodiaadia.com.br',
        name: 'Águas Lindas',
        branch: 0,
      },
      {
        email: 'gerencia.sia@atacadaodiaadia.com.br',
        name: 'Sia',
        branch: 0,
      },
      {
        email: 'gerencia.br070@atacadaodiaadia.com.br',
        name: 'Ceilândia BR 070',
        branch: 0,
      },
      {
        email: 'gerencia.guara@atacadaodiaadia.com.br',
        name: 'Guará',
        branch: 0,
      },
      {
        email: 'gerencia.vcp@atacadaodiaadia.com.br',
        name: 'Vicente Pires Rua 12',
        branch: 0,
      },
      {
        email: 'gerencia.qnm11@atacadaodiaadia.com.br',
        name: 'Ceilândia Centro',
        branch: 0,
      },
      {
        email: 'gerencia.cdn@atacadaodiaadia.com.br',
        name: 'Caldas Novas',
        branch: 0,
      },
      {
        email: 'gerencia.rvd@atacadaodiaadia.com.br',
        name: 'Rio Verde',
        branch: 0,
      },
      {
        email: 'gerencia.smb2@atacadaodiaadia.com.br',
        name: 'Samambaia Furnas',
        branch: 0,
      },
      {
        email: 'gerencia.novogama@atacadaodiaadia.com.br',
        name: 'Novo Gama',
        branch: 0,
      },
      {
        email: 'gerencia.pdf@atacadaodiaadia.com.br',
        name: 'Planaltina DF',
        branch: 0,
      },
      {
        email: 'gerencia.agc@atacadaodiaadia.com.br',
        name: 'Águas Claras',
        branch: 0,
      },
      {
        email: 'gerencia.itb@atacadaodiaadia.com.br',
        name: 'Itumbiara GO',
        branch: 0,
      },
      {
        email: 'gerencia.vcp2@atacadaodiaadia.com.br',
        name: 'Vicente Pires Rua 04',
        branch: 0,
      },
      {
        email: 'gerencia.sob@atacadaodiaadia.com.br',
        name: 'Sobradinho',
        branch: 0,
      },
      {
        email: 'gerencia.pgo@atacadaodiaadia.com.br',
        name: 'Planaltina GO',
        branch: 0,
      },
      {
        email: 'gerencia.smb@atacadaodiaadia.com.br',
        name: 'Samambaia Norte',
        branch: 0,
      },
      {
        email: 'gerencia.lem@atacadaodiaadia.com.br',
        name: 'Luís Eduardo Magalhães',
        branch: 0,
      },
      {
        email: 'delivered@resend.dev',
        name: 'Gurupi',
        branch: 0,
      },
      {
        email: 'gerencia.luz2@atacadaodiaadia.com.br',
        name: 'Luziânia 2',
        branch: 0,
      },
      {
        name: 'Luziânia 1',
        email: 'gerencia.luz@atacadaodiaadia.com.br',
        branch: 0,
      },
    ],
  })
}

seed().then(() => {
  console.log('✅ Seed executado com ID dinâmico')
  prisma.$disconnect()
})
