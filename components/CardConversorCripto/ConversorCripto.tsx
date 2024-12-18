'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ConversorCripto() {
    const [ValorMoedaNaCompra, setValorMoedaNaCompra] = useState<number>()
    const [valorInvestido, setValorInvestido] = useState<number>()
    const [criptoSelecionada, setCriptoSelecionada] = useState<string>('custonCoin')
    const [valorFinal, setValorFinal] = useState<number | null>(null)

    const calcularQuantidade = (): number => {
        if(!ValorMoedaNaCompra || !valorInvestido){
            throw new Error("Informe valores validos.");
        }
        if (ValorMoedaNaCompra <= 0 || valorInvestido <= 0) {
            throw new Error("Os valores devem ser maiores que zero.");
        }
        return valorInvestido / ValorMoedaNaCompra;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        setValorFinal(calcularQuantidade())
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-indigo-950">Conversor de Cripto</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="criptoSelecionada">Criptomoeda</Label>
                        <Select value={criptoSelecionada} onValueChange={setCriptoSelecionada} required>
                            <SelectTrigger id="criptoSelecionada">
                                <SelectValue placeholder="Selecione uma criptomoeda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                                <SelectItem value="custonCoin">Outra moeda</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ValorMoedaNaCompra">Preço da moeda na compra</Label>
                        <Input
                            id="ValorMoedaNaCompra"
                            type="number"
                            min={0}
                            value={ValorMoedaNaCompra}
                            onChange={(e) => setValorMoedaNaCompra(e.target.value)}
                            placeholder="Ex: 50000"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="valorInvestido">Valor investido</Label>
                        <Input
                            id="valorInvestido"
                            type="number"
                            min={0}
                            value={valorInvestido}
                            onChange={(e) => setValorInvestido(e.target.value)}
                            placeholder="Ex: 0.5"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-indigo-800 hover:bg-indigo-600">Calcular quantidade</Button>
                </form>
                {valorFinal !== null && (
                    <div className="mt-4 p-4 bg-indigo-50 rounded-md">
                        <p className="text-center font-semibold">
                            {
                                !!criptoSelecionada && (criptoSelecionada !== "custonCoin")
                                ? `Quantidade de ${criptoSelecionada} recebida: ${valorFinal} ${criptoSelecionada}`
                                : `Quantidade recebida: ${valorFinal}`
                            }

                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

