<div className='w-full h-10%'>
                <div className='w-full h-full px-8 pt-2 pb-2 flex flex-row flex-wrap justify-center items-center'>
                    <div className='w-full h-full bg-[#D9D9D9] shadow-md shadow-black rounded-md p-2'>
                        <form className='flex justify-start item flex-row pl-4'>
                            <div className='pr-4 w-fit border-r-2 border-[#1474EA]'>
                                <select className="bg-white w-72 rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8" type="number" name="distritoID" id="distrito">
                                    <option hidden value="">Seleccione un distrito</option>
                                    <option value="1">DISTRITO I</option>
                                    <option value="2">DISTRITO II</option>
                                    <option value="3">DISTRITO III</option>
                                    <option value="4">DISTRITO IV</option>
                                    <option value="5">DISTRITO V</option>
                                    <option value="6">DISTRITO VI</option>
                                    <option value="7">DISTRITO VII</option>
                                    <option value="8">DISTRITO VIII</option>
                                    <option value="9">DISTRITO IX</option>
                                    <option value="10">DISTRITO X</option>
                                </select>
                            </div>
                            <div className='pl-4 flex justify-start items-center gap-4 pr-4 border-r-2 border-[#1474EA]'>
                                <input type='checkbox' className='bg-white w-8 h-6'></input>
                                <label htmlFor="">ARRIBO</label>
                                <input type='checkbox' className='bg-white w-8 h-6'></input>
                                <label htmlFor="">ARRIBO INVALIDO</label>
                                <input type='checkbox' className='bg-white w-8 h-6'></input>
                                <label htmlFor="">LOGIN</label>
                                <input type='checkbox' className='bg-white w-8 h-6'></input>
                                <label htmlFor="">NOVEDAD</label>
                            </div>
                            <div className='flex items-center ml-auto pr-4'>
                                <button className='bg-[#1474EA] text-white rounded-lg py-1 px-2 border-[#1474E4]/50 border-2 focus:outline-[#1474E4] h-8 w-32 uppercase font-semibold'>Filtrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>